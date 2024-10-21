import PropTypes from 'prop-types';
import { Input } from '@/components/ui/input';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup } from '@/components/ui/radio-group';
import { RadioGroupItem } from '@/components/ui/radio-group';

export const InputField = ({
  control,
  name,
  label,
  type = 'text', // default type as 'text'
  values, // Array of objects: { id, label, value }
  placeholder,
  className = '',
  inputStyle = '',
  labelStyle = '',
  description = '',
  descriptionStyle = '',
  formStyle = '',
  children, // Allow custom content as children
  ...props
}) => {
  // Render input field based on type
  const renderInput = (type, field) => {
    switch (type) {
      case 'checkbox':
        if (values && values.length > 0) {
          // Render multiple checkboxes
          return (
            <div className="space-y-2">
              {values.map((item) => (
                <FormItem
                  key={item.id}
                  className="flex flex-row items-start space-x-3 space-y-0"
                >
                  <FormControl>
                    {/* TODO: Label Mistake */}
                    <Checkbox
                      id={item.label}
                      name={item.label}
                      checked={field.value?.includes(
                        item.id,
                      )}
                      onCheckedChange={(checked) => {
                        const newValue = checked
                          ? [
                              ...(field.value || []),
                              item.id,
                            ]
                          : field.value?.filter(
                              (value) => value !== item.id,
                            );
                        field.onChange(newValue);
                      }}
                    />
                  </FormControl>
                  <FormLabel
                    className="font-normal"
                    htmlFor={item.label}
                  >
                    {item.label}
                  </FormLabel>
                </FormItem>
              ))}
            </div>
          );
        } else {
          // Single checkbox (just a boolean value)
          return (
            <Checkbox
              id={name}
              name={name}
              checked={field.value || false}
              onCheckedChange={(checked) =>
                field.onChange(checked)
              }
              {...props}
            />
          );
        }
      case 'textarea':
        return (
          <Textarea
            placeholder={placeholder || label}
            className={inputStyle}
            {...field}
            {...props} // Spread any additional props like `disabled`
          />
        );
      case 'select':
        return (
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            id={name}
            name={name}
          >
            <FormControl>
              <SelectTrigger id={name} name={name}>
                <SelectValue
                  placeholder={placeholder || label}
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {values.map((item) => (
                <SelectItem
                  key={item.id}
                  value={item.id}
                  id={item.id}
                >
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case 'radio':
        return (
          <RadioGroup
            onValueChange={field.onChange}
            defaultValue={field.value}
            id={name}
            name={name}
          >
            {values.map((item) => (
              <FormItem
                key={item.id}
                className="flex items-center space-x-3 space-y-0"
              >
                <FormControl>
                  <RadioGroupItem
                    value={item.id}
                    id={item.id}
                  />
                </FormControl>
                <FormLabel
                  htmlFor={item.id}
                  className="font-normal"
                >
                  {item.label}
                </FormLabel>
              </FormItem>
            ))}
          </RadioGroup>
        );
      default:
        return (
          <Input
            placeholder={placeholder || label}
            type={type}
            className={inputStyle}
            id={name}
            name={name}
            {...field}
            {...props}
          />
        );
    }
  };

  return (
    <>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className={className}>
            {label && type === 'radio' ? (
              <FormLabel
                className={labelStyle}
                htmlFor={undefined}
                id={name}
                name={name}
              >
                {label}
              </FormLabel>
            ) : label ? (
              <FormLabel
                className={labelStyle}
                htmlFor={name}
              >
                {label}
              </FormLabel>
            ) : null}

            <FormControl className={formStyle}>
              {renderInput(type, field)}
            </FormControl>
            {description && (
              <FormDescription className={descriptionStyle}>
                {description}
              </FormDescription>
            )}
            <FormMessage />
            {children && <div>{children}</div>}
          </FormItem>
        )}
      />
    </>
  );
};

// Prop types
InputField.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  values: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ), // Only used for checkboxes
  placeholder: PropTypes.string,
  className: PropTypes.string,
  description: PropTypes.string,
  inputStyle: PropTypes.string,
  labelStyle: PropTypes.string,
  descriptionStyle: PropTypes.string,
  formStyle: PropTypes.string,
  children: PropTypes.node, // Custom content (optional)
};
