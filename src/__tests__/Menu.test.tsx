import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react'
import { CustomerTypeMenu } from 'src/components'
import { Business, Person } from '@mui/icons-material'

describe('Menu component', () => {
  const options = [
    { value: 'PF', label: 'Pessoa Física', icon: <Person /> },
    { value: 'PJ', label: 'Pessoa Jurídica', icon: <Business /> },
  ]

  it('renders menu items correctly', () => {
    const selectedOption = 'PF'
    const onChange = jest.fn()
    const { getByText } = render(
      <CustomerTypeMenu
        options={options}
        selectedOption={selectedOption}
        onChange={onChange}
      />
    )

    options.forEach((option) => {
      const menuItem = getByText(option.label)
      expect(menuItem).toBeInTheDocument()
    })
  })

  it('triggers onChange event when clicking on a menu item', () => {
    const selectedOption = 'PF'
    const onChange = jest.fn()
    const { getByText } = render(
      <CustomerTypeMenu
        options={options}
        selectedOption={selectedOption}
        onChange={onChange}
      />
    )

    const menuItemPJ = getByText('Pessoa Jurídica')
    fireEvent.click(menuItemPJ)

    expect(onChange).toHaveBeenCalledWith('PJ')
  })

  it('does not trigger onChange event when clicking on a menu item during editing', () => {
    const selectedOption = 'PF'
    const onChange = jest.fn()
    const isEditing = true
    const { getByText } = render(
      <CustomerTypeMenu
        options={options}
        selectedOption={selectedOption}
        onChange={onChange}
        isEditing={isEditing}
      />
    )

    const menuItemPJ = getByText('Pessoa Jurídica')
    fireEvent.click(menuItemPJ)

    expect(onChange).not.toHaveBeenCalled()
  })
})
