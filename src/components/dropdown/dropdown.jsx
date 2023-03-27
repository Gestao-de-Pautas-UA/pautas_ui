import { Dropdown, DropdownButton } from 'react-bootstrap';

export default function MyDropdown() {
  return (
    <DropdownButton id="dropdown-basic-button" title="Ano lectivo:">
      <Dropdown.Item href="#/action-1">2022/2023</Dropdown.Item>
      <Dropdown.Item href="#/action-2">2021/2022</Dropdown.Item>

    </DropdownButton>
  );
}