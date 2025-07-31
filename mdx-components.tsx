import type { MDXComponents } from 'mdx/types'
 
const components: MDXComponents = {
    h1: (props) => <h1 className="text-3xl font-extrabold my-8" {...props} />,
    h2: (props) => <h2 className="text-2xl font-bold my-6" {...props} />,
    p: (props) => <p className="text-base my-4" {...props} />,
}
 
export function useMDXComponents(): MDXComponents {
  return components
}