import Image from 'next/image';
import { Description } from '../../../ui/Description';
import { Heading } from '../../../ui/Heading';

interface SkillProps {
  name: string;
  icon: string;
  size?: number;
  className?: string;
  hasBackground?: boolean;
}

function Skill({
  name,
  icon,
  size = 40,
  className,
  hasBackground,
}: SkillProps) {
  return (
    <div
      className={`${className} flex items-center gap-2`}
      style={{
        fontSize: `clamp(10px, calc(${size}px * 0.35), 20px)`,
        fontWeight: 'bold',
        color: 'var(--color-text-tertiary)',
      }}
    >
      <div
        style={{
          width: size,
          height: size,
        }}
        className={`
          ${
            hasBackground
              ? 'p-1 border-2 border-gray-900 dark:border-gray-200 dark:bg-gray-50'
              : 'p-0'
          } rounded-full`}
      >
        <Image src={icon} alt={name} width={size} height={size} />
      </div>
      <span>{name}</span>
    </div>
  );
}

export default function SkillList({
  skills,
  title,
  description,
}: {
  skills: SkillProps[];
  title: string;
  description?: string;
}) {
  return (
    <div>
      <Heading size={3} visualSize="md" className="mb-4">
        {title}
      </Heading>
      <ul className="flex flex-wrap gap-4">
        {skills.map(skill => (
          <li key={skill.name} className="flex items-center gap-2">
            <Skill {...skill} />
          </li>
        ))}
      </ul>
      {description && (
        <Description className="mt-4" leading="7" preserveWhitespace breakKeep>
          {description}
        </Description>
      )}
    </div>
  );
}
