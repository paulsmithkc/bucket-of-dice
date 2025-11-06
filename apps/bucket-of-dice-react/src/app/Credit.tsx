export const Credit: FC<{}> = () => {
  return (
    <div>
      Created by{' '}
      <a
        className="font-semibold text-blue-500 hover:text-blue-800 hover:underline transition"
        href="https://paulsmith.dev"
      >
        Paul Smith
      </a>{' '}
      &bull;{' '}
      <a
        className="font-semibold text-blue-500 hover:text-blue-800 hover:underline transition"
        href="https://github.com/paulsmithkc/bucket-of-dice"
        target="_blank"
      >
        Source Code
      </a>
    </div>
  )
}
