import { useCallback, useState } from 'react'

export default function useGetValue(initialValue) {
  const [valueInput, setValueInput] = useState(initialValue)
  const handleDataChange = useCallback((key, value) => setValueInput((prev) => ({ ...prev, [key]: value })), [])
  return { valueInput, setValueInput, handleDataChange }
}
