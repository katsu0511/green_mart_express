import { Button } from '@mui/material';

export default function AtomButton({ usage, hasClicked }: { usage: string, hasClicked: boolean }) {
  return (
    <Button
      type='submit'
      variant='contained'
      size='medium'
      disabled={hasClicked}
      sx={{
        display: 'block',
        margin: '0 auto',
      }}
    >
      {hasClicked ? 'Loading…' : usage}
    </Button>
  );
}
