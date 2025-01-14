import React from "react"
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"

interface DropdownItemType {
  text: string
  onClick: () => void
}

interface DropdownButtonProps {
  items: DropdownItemType[]
  title: string
}

const DropdownButton: React.FC<DropdownButtonProps> = ({ items, title }) => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false)

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen)

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
      <DropdownToggle caret color="primary">
        {title}
      </DropdownToggle>
      <DropdownMenu>
        {items.map((item, index) => (
          <DropdownItem key={index} onClick={item.onClick}>
            {item.text}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}

export default DropdownButton

