import { useState } from 'react'
import ShowMoreText from 'react-show-more-text'

export default function ShowMoreContent({
  children,
  lines = 3,
  className = '',
  anchorClass = 'text-blue-500 cursor-pointer hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-500',
  more = 'Show more',
  less = 'Show less'
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const executeOnClick = (currentIsExpanded) => {
    console.log(currentIsExpanded)
    setIsExpanded(!currentIsExpanded)
  }
  return (
    <ShowMoreText
      /* Default options */
      lines={lines}
      more={more}
      less={less}
      className={className}
      anchorClass={anchorClass}
      onClick={executeOnClick}
      expanded={isExpanded}
      truncatedEndingComponent={'... '}
    >
      {children}
    </ShowMoreText>
  )
}
