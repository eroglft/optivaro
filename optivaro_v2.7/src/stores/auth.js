import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('ov_user') || 'null'))
  // Load contracts from localStorage on startup — persists across refreshes
  const contracts = ref(JSON.parse(localStorage.getItem('ov_contracts') || '[]'))
  const contactRequests = ref(JSON.parse(localStorage.getItem('ov_contacts') || '[]'))

  const isLoggedIn = computed(() => !!user.value)
  const isAdmin    = computed(() => user.value?.role === 'admin')

  const USERS = [
    { id: 1, username: 'admin', password: 'optivaro2024', role: 'admin', name: 'Administrator' },
  ]

  function login(username, password) {
    const found = USERS.find(u => u.username === username && u.password === password)
    if (found) {
      const { password: _, ...safe } = found
      user.value = safe
      localStorage.setItem('ov_user', JSON.stringify(safe))
      return true
    }
    return false
  }

  function logout() {
    user.value = null
    localStorage.removeItem('ov_user')
  }

  function saveContract(formData, templateName) {
    const contract = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      templateName,
      status: 'abgeschlossen',
      emailSent: false,
      customer: {
        salutation:   formData.salutation,
        title:        formData.title,
        firstName:    formData.firstName,
        lastName:     formData.lastName,
        email:        formData.email,
        phone:        formData.phone,
        birthDate:    formData.birthDate,
        company:      formData.company,
        street:       formData.street,
        houseNumber:  formData.houseNumber,
        staircase:    formData.staircase,
        floor:        formData.floor,
        door:         formData.door,
        postalCode:   formData.postalCode,
        city:         formData.city,
      },
      product: {
        provider:          formData.provider,
        energyType:        formData.energyType,
        customerType:      formData.customerType,
        paymentMethod:     formData.paymentMethod,
        deliveryType:      formData.deliveryType,
        contactType:       formData.contactType,
        gridOperator:      formData.gridOperator,
        previousSupplier:  formData.previousSupplier,
        meterPointId:      formData.meterPointId,
        meterNumber:       formData.meterNumber,
        accountHolder:     formData.accountHolder,
        meterPointId:      formData.meterPointId,
        meterNumber:       formData.meterNumber,
        annualConsumption: formData.annualConsumption,
        deliveryStart:     formData.deliveryStart,
        iban:              formData.iban ? '****' + formData.iban.slice(-4) : '',
        signLocation:      formData.signLocation,
        signDate:          formData.signDate,
      },
      agent: formData.agent || '',
    }
    contracts.value.unshift(contract)
    // Persist immediately
    localStorage.setItem('ov_contracts', JSON.stringify(contracts.value))
    return contract.id
  }

  function deleteContract(id) {
    contracts.value = contracts.value.filter(c => c.id !== id)
    localStorage.setItem('ov_contracts', JSON.stringify(contracts.value))
  }

  function saveContactRequest(data) {
    const req = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      status: 'neu',
      ...data
    }
    contactRequests.value.unshift(req)
    localStorage.setItem('ov_contacts', JSON.stringify(contactRequests.value))
    return req.id
  }

  function deleteContactRequest(id) {
    contactRequests.value = contactRequests.value.filter(r => r.id !== id)
    localStorage.setItem('ov_contacts', JSON.stringify(contactRequests.value))
  }

  // Export all data as JSON for backup
  function exportData() {
    const data = {
      exportedAt: new Date().toISOString(),
      contracts: contracts.value,
      contactRequests: contactRequests.value,
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href = url
    a.download = `optivaro_export_${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a); a.click()
    document.body.removeChild(a); URL.revokeObjectURL(url)
  }

  return { user, contracts, contactRequests, isLoggedIn, isAdmin,
           login, logout, saveContract, deleteContract,
           saveContactRequest, deleteContactRequest, exportData }
})
