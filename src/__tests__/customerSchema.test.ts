import { CustomerSchema, CustomerSchemaDataType } from '../models/customer'

describe('CustomerSchema', () => {
  it('should accept valid individual customer data', () => {
    const validIndividualData: CustomerSchemaDataType = {
      type: 'PF',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '(99) 99999-9999',
      cpf: '123.456.789-10',
    }
    expect(CustomerSchema.parse(validIndividualData)).toEqual(
      validIndividualData
    )
  })

  it('should accept valid corporate customer data', () => {
    const validCorporateData: CustomerSchemaDataType = {
      type: 'PJ',
      name: 'ABC Company',
      email: 'contact@abc.com',
      phone: '(99) 99999-9999',
      fantasy_name: 'ABC Corp',
      cnpj: '12.345.678/0001-90',
    }
    expect(CustomerSchema.parse(validCorporateData)).toEqual(validCorporateData)
  })

  it('should reject invalid individual customer data', () => {
    const invalidIndividualData: Partial<CustomerSchemaDataType> = {
      type: 'PF',
      name: 'JD',
      email: 'invalid-email',
      phone: '1234',
      cpf: '123.456.789-99',
    }
    expect(() => CustomerSchema.parse(invalidIndividualData)).toThrow()
  })

  it('should reject invalid corporate customer data', () => {
    const invalidCorporateData: Partial<CustomerSchemaDataType> = {
      type: 'PJ',
      name: 'AB',
      email: 'invalid-email',
      phone: '1234',
      fantasy_name: 'A',
      cnpj: '1.345.678/0001-99',
    }
    expect(() => CustomerSchema.parse(invalidCorporateData)).toThrow()
  })
})
