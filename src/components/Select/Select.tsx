import React, { useState, useEffect, useRef } from "react";
import type { SelectProps, Option } from "./types";

const Select: React.FC<SelectProps> = ({
  options,
  multiple = false,
  value,
  onChange,
  placeholder = "Select...",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  //*İstifadəçi Select komponentindən kənara klik etsə,dropdown menyu bağlansın deye
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isSelected = (option: Option) => {
    if (multiple) {
      return (
        Array.isArray(value) && value.some((v) => v.value === option.value)
      );
    } else {
      return (value as Option)?.value === option.value;
    }
  };

  const toggleOption = (option: Option) => {
    if (multiple) {
      if (!Array.isArray(value)) return;
      if (isSelected(option)) {
        onChange(value.filter((v) => v.value !== option.value));
      } else {
        onChange([...value, option]);
      }
    } else {
      if (isSelected(option)) {
        onChange(null);
      } else {
        onChange(option);
      }
      setIsOpen(false);
    }
    setSearch("");
  };

  const removeOption = (option: Option) => {
    if (!multiple || !Array.isArray(value)) return;
    onChange(value.filter((v) => v.value !== option.value));
  };

  const renderSelected = () => {
    if (multiple) {
      if (!value || (Array.isArray(value) && value.length === 0)) {
        return <div className="placeholder">{placeholder}</div>;
      }
      return (value as Option[]).map((opt) => (
        <div key={opt.value} className="selected-item">
          {opt.label}
          <button
            type="button"
            className="remove-btn"
            onClick={(e) => {
              e.stopPropagation();
              removeOption(opt);
            }}
          >
            ×
          </button>
        </div>
      ));
    } else {
      return (
        (value as Option)?.label || (
          <div className="placeholder">{placeholder}</div>
        )
      );
    }
  };

  return (
    <div className="select-container" ref={containerRef}>
      <div
        className={`select-input ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="selected-values">{renderSelected()}</div>
        <div className="arrow">{isOpen ? "▲" : "▼"}</div>
      </div>
      {isOpen && (
        <div className="options-dropdown">
          <input
            type="text"
            className="search-input"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          />
          {filteredOptions.length === 0 ? (
            <div className="no-options">No results found</div>
          ) : (
            filteredOptions.map((opt) => (
              <div
                key={opt.value}
                className={`option-item ${isSelected(opt) ? "selected" : ""}`}
                onClick={() => toggleOption(opt)}
              >
                {opt.label}
                {isSelected(opt) && <span className="checkmark">✓</span>}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Select;
