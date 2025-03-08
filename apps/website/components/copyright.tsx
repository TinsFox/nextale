import Link from "next/link"

export function Copyright() {
  return (
    <div className="mt-8 p-4 bg-gray-100 rounded-lg">
      <p className="text-sm text-gray-600">
        商业转载请联系站长获得授权，非商业转载请注明本文出处及文章链接，您可以自由地在任何媒体以任何形式复制和分发作品，也可以修改和创作，但是分发衍生作品时必须采用相同的许可协议。
        本文采用{" "}
        <Link
          href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
          className="text-blue-600 hover:underline"
          target="_blank"
        >
          CC BY-NC-SA 4.0 - 非商业性使用 - 相同方式共享 4.0
        </Link>{" "}
        国际进行许可。
      </p>
    </div>
  )
}
