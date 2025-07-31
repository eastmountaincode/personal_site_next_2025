import type { MDXComponents } from 'mdx/types'
 
const components: MDXComponents = {
    h1: (props) => <h1 className="text-3xl font-extrabold my-8" {...props} />,
    h2: (props) => <h2 className="text-2xl font-bold my-6" {...props} />,
    p: (props) => <p className="text-base my-4" {...props} />,
    a: (props) => (
        <a
            {...props}
            className={
                "underline text-black hover:text-blue-800 " +
                (props.className || "")
            }
            target={props.href?.startsWith('http') ? '_blank' : undefined}
            rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        />
    )
}
 
export function useMDXComponents(): MDXComponents {
  return components
}