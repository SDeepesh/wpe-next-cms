import styled from '@emotion/styled';

const Field = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-bottom: 28px;
`;

const Label = styled.label`
  font-weight: 700;
  margin-bottom: 1rem;
  font-size: 15px;
`;

const Input = styled.input`
  min-width: 200px;
  max-width: 300px;
  padding: 16px !important;
  line-height: 20px;
  border-radius: 2px;
  border: 1px solid #9db7d1;
  font-size: 14px;
  min-width: 35vw;
`;

interface FieldInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
}

export default function FieldInput({
  label,
  type,
  value,
  onChange,
}: FieldInputProps) {
  return (
    <Field>
      <Label>{label}</Label>
      <Input type={type} value={value} onChange={onChange} />
    </Field>
  );
}
