import React from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Option {
  value: string
  label: string
}

interface MultiSelectProps {
  options: Option[]
  value: string[]
  onChange: (value: string[]) => void
  placeholder?: string
}

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder,
}: MultiSelectProps) {
  return (
    <Select
      multiple
      value={value}
      onValueChange={(newValue) => {
        if (Array.isArray(newValue)) {
          onChange(newValue);
        }
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder={placeholder}>
          {value.length === 0
            ? placeholder
            : `${value.length} item${value.length !== 1 ? "s" : ""} selected`}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
