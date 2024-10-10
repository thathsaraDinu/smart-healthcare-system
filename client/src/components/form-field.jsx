import PropTypes from 'prop-types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const InputField = ({
  label,
  name,
  type = 'text',
  placeholder,
  register,
  errors,
  validation,
  options,
  ...props
}) => (
  <div className="space-y-2">
    {type === 'radio' ? (
      <>
        <Label>{label}</Label>
        <div className="flex gap-8">
          {options?.map((option) => (
            <div
              key={option.value}
              className="flex items-center"
            >
              <input
                type="radio"
                value={option.value}
                name={name}
                id={option.value}
                {...register(name, { ...validation })}
              />
              <Label
                htmlFor={option.value}
                className="ms-3"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </>
    ) : (
      <>
        <Label htmlFor={name}>{label}</Label>
        <Input
          id={name}
          type={type}
          placeholder={placeholder || label}
          {...register(name, { ...validation })}
          aria-invalid={errors?.[name] ? 'true' : 'false'}
          aria-describedby={`${name}-error`}
          {...props} // Spread any additional props
        />
      </>
    )}
    {errors?.[name] && (
      <span
        id={`${name}-error`}
        className="text-sm text-red-500"
      >
        {errors[name]?.message}
      </span>
    )}
  </div>
);

// Prop Types
InputField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  register: PropTypes.func.isRequired, // The register function from react-hook-form
  errors: PropTypes.object, // Form errors object from react-hook-form
  validation: PropTypes.object, // Validation rules (optional)
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ), // Options for radio buttons
};

export default InputField;
