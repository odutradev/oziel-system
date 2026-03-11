import { Fade, TextField, ToggleButton } from '@mui/material';

import { Container, TitleSection, Title, Subtitle, ControlsSection, CustomDateWrapper, dateInputStyles, DateSeparator, StyledToggleButtonGroup } from './styles';

import type { MetricsDashboardHeaderProps } from './types';

const MetricsDashboardHeader = ({ title, subtitle, period, startDate, endDate, onDateChange, onPeriodChange }: MetricsDashboardHeaderProps) => {
  const isCustom = period === 'custom';

  return (
    <Container>
      <TitleSection>
        <Title variant="h4">
          {title}
        </Title>
        <Subtitle variant="body2">
          {subtitle}
        </Subtitle>
      </TitleSection>

      <ControlsSection>
        <Fade in={isCustom} timeout={300} unmountOnExit>
          <CustomDateWrapper>
            <TextField
              type="date"
              size="small"
              value={startDate}
              onChange={onDateChange('startDate')}
              variant="outlined"
              sx={dateInputStyles}
            />
            <DateSeparator>-</DateSeparator>
            <TextField
              type="date"
              size="small"
              value={endDate}
              onChange={onDateChange('endDate')}
              variant="outlined"
              sx={dateInputStyles}
            />
          </CustomDateWrapper>
        </Fade>

        <StyledToggleButtonGroup
          value={period}
          exclusive
          onChange={onPeriodChange}
          aria-label="period selector"
        >
          <ToggleButton value="90" disableRipple>90d</ToggleButton>
          <ToggleButton value="60" disableRipple>60d</ToggleButton>
          <ToggleButton value="30" disableRipple>30d</ToggleButton>
          <ToggleButton value="15" disableRipple>15d</ToggleButton>
          <ToggleButton value="custom" disableRipple>Personalizado</ToggleButton>
        </StyledToggleButtonGroup>
      </ControlsSection>
    </Container>
  );
};

export default MetricsDashboardHeader;