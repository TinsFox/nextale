import "./emoji-list.scss"

import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react"

interface EmojiListProps {
  items: { name: string; fallbackImage?: string; emoji?: string }[]
  command: (arg: { name: string }) => void
}

export const EmojiList = forwardRef((props: EmojiListProps, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const selectItem = (index: number) => {
    const item = props.items[index]

    if (item) {
      props.command({ name: item.name })
    }
  }

  const upHandler = () => {
    setSelectedIndex(
      (selectedIndex + props.items.length - 1) % props.items.length
    )
  }

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % props.items.length)
  }

  const enterHandler = () => {
    selectItem(selectedIndex)
  }

  useEffect(() => setSelectedIndex(0), [props.items])

  useImperativeHandle(ref, () => {
    return {
      onKeyDown: (x: { event: KeyboardEvent }) => {
        if (x.event.key === "ArrowUp") {
          upHandler()
          return true
        }

        if (x.event.key === "ArrowDown") {
          downHandler()
          return true
        }

        if (x.event.key === "Enter") {
          enterHandler()
          return true
        }

        return false
      },
    }
  }, [upHandler, downHandler, enterHandler])

  return (
    <div className="dropdown-menu">
      {props.items.map((item, index) => (
        <button
          className={index === selectedIndex ? "is-selected" : ""}
          key={index}
          onClick={() => selectItem(index)}
        >
          {item.fallbackImage ? <img src={item.fallbackImage} /> : item.emoji}:
          {item.name}:
        </button>
      ))}
    </div>
  )
})

EmojiList.displayName = "EmojiList"
