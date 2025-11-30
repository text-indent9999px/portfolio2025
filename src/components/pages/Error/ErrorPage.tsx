import React from 'react';
import { CenteredLayout } from '../../layout';
import Blank from '../../ui/Blank';
import CustomButton, { BackButton } from '../../ui/Button';
import { PageHeader } from '../../ui/Heading';

interface ApiError {
  status?: number;
  code?: number;
  message?: string;
  response?: {
    status?: number;
    data?: {
      message?: string;
    };
  };
}

interface ErrorPageProps {
  errorCode?: number;
  error: Error | ApiError;
  title?: string;
  description?: string;
  additionalComponent?: React.ReactNode;
  showBackButton?: boolean;
  onBackClick?: () => void;
  backHref?: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({
  errorCode,
  error,
  title,
  description,
  backHref,
  showBackButton = true,
}) => {
  // ApiError 타입 가드
  const isApiError = (err: Error | ApiError): err is ApiError => {
    return 'status' in err || 'code' in err || 'response' in err;
  };

  // 에러 객체에서 코드 추출
  const getErrorCode = (): number => {
    if (errorCode) return errorCode;
    if (isApiError(error)) {
      if (error.status) return error.status;
      if (error.code) return error.code;
      if (error.response?.status) return error.response.status;
    }
    return 500; // 기본값
  };

  // 기본 에러 메시지 매핑
  const getDefaultDescription = (code: number): string => {
    switch (code) {
      case 400:
        return '잘못된 요청입니다. 요청을 다시 확인해주세요.';
      case 401:
        return '인증이 필요합니다. 로그인 후 다시 시도해주세요.';
      case 403:
        return '접근 권한이 없습니다. 관리자에게 문의해주세요.';
      case 404:
        return '페이지를 찾을 수 없습니다. URL을 확인해주세요.';
      case 500:
        return '서버에 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
      case 503:
        return '서비스를 일시적으로 사용할 수 없습니다.';
      default:
        return '알 수 없는 오류가 발생했습니다.';
    }
  };

  const actualErrorCode = getErrorCode();
  const errorDescription =
    description || getDefaultDescription(actualErrorCode);

  return (
    <CenteredLayout maxWidth="4xl">
      <div className="flex flex-col w-full h-full">
        <div className="xl:mt-[22vh]">
          {showBackButton && (
            <>
              <BackButton newHref={backHref} />
              <Blank height="2rem" bgColor="transparent" />
            </>
          )}

          {/* 에러 코드 제목 */}
          <PageHeader
            title={`${actualErrorCode} Code Error`}
            fontFamily="eng-point"
            visualSize="3xl"
            bottomSpacing="md"
            className={{ title: 'text-error-500' }}
            subtitle={`${title ? title + '\n' : ''}${errorDescription}`}
          />

          {actualErrorCode === 500 && (
            <>
              <CustomButton
                variant="outlined"
                color="primary"
                size="md"
                onClick={() => {
                  window.location.reload();
                }}
                rounded="full"
                fullWidth={true}
              >
                새로 고침
              </CustomButton>
              <Blank height="2rem" bgColor="transparent" />
            </>
          )}
        </div>
      </div>
    </CenteredLayout>
  );
};

export default ErrorPage;
