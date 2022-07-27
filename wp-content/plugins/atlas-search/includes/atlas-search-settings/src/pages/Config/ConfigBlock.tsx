import {
  Container,
  Grid,
  Typography,
  Checkbox,
  FormLabel,
  Slider,
} from '@mui/material';

import { styled } from '@mui/material/styles';

import { Config, Fields } from './types';

interface FieldProps {
  modelName: string;
  name: string;
  config: Config;
  onChange: (fieldName: string, updatedConfig: FieldUpdate) => void;
}

interface FieldUpdate {
  searchable?: boolean;
  weight?: number;
}

interface Props {
  name: string;
  fields: Fields;
  onChange: (fieldName: string, updatedConfig: FieldUpdate) => void;
}

export default function ConfigBlock(props: Props) {
  const { name, fields, onChange } = props;

  const baseFields: Array<string> = [];
  const additionalFields: Array<string> = [];

  Object.keys(fields).forEach((field) => {
    if (field.includes('.')) {
      additionalFields.push(field);
    } else {
      baseFields.push(field);
    }
  });

  const BorderedContainer = styled(Container)(({ theme }) => ({
    borderLeftWidth: 5,
    borderLeftStyle: 'solid',
    borderColor: theme.wpColors.tiffany,
    boxShadow: theme.shadows[3],
    marginTop: theme.spacing(8),
  }));

  return (
    <BorderedContainer maxWidth="xl">
      <Grid container spacing={2} key={`${name}-header`} mb={2}>
        <Grid item key={name} xs={12}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            {name}
          </Typography>
        </Grid>

        <Grid item xs={4}>
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            Field Name
          </Typography>
        </Grid>

        <Grid item xs={4}>
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            Searchable
          </Typography>
        </Grid>

        <Grid item xs={4}>
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            Weight
          </Typography>
        </Grid>
      </Grid>

      {baseFields.map((field) => (
        <Field
          key={`base-field-config-${field}`}
          name={field}
          config={fields[field]}
          modelName={name}
          onChange={onChange}
        />
      ))}

      {additionalFields.length > 0 && (
        <Typography mt={2}>
          <strong>Additonal Fields</strong>
        </Typography>
      )}

      {additionalFields.map((field) => (
        <Field
          key={`field-config-${field}`}
          name={field}
          config={fields[field]}
          modelName={name}
          onChange={onChange}
        />
      ))}
    </BorderedContainer>
  );
}

function Field(props: FieldProps) {
  const { name, config, onChange } = props;

  return (
    <Grid
      container
      key={`${name}-item`}
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={4}>
        <FormLabel>{name}</FormLabel>
      </Grid>

      <Grid item xs={4}>
        <Checkbox
          sx={{ paddingLeft: 0 }}
          checked={config.searchable}
          onChange={() => onChange(name, { searchable: !config.searchable })}
        />
      </Grid>

      <Grid item xs={4}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <FormLabel sx={{ margin: 0, minWidth: 40 }}>
            {config.weight}
          </FormLabel>

          <Slider
            sx={{
              width: '80%',
              height: 8,
              '& .MuiSlider-rail': {
                opacity: 1,
                backgroundColor: '#dee2e6',
              },
            }}
            value={config.weight}
            max={200}
            min={1}
            onChange={(_event, newValue) => {
              onChange(name, { weight: newValue as number });
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
