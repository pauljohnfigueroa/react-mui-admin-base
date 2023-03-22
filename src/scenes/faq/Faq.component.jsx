import { Box, Typography, useTheme } from '@mui/material'
import Header from '../../components/header/Header.component'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { tokens } from '../../theme'

const Faq = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  return (
    <Box m="20px">
      <Header title="FAQ" subtitle="Frequently Asked Questions." />
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            What is Artificial Intelligence?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          The theory and development of computer systems able to perform tasks normally requiring
          human intelligence, such as visual perception, speech recognition, decision-making, and
          translation between languages.
          <br />
          <br /> - This content is from https://towardsdatascience.com/
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Will AI steal your jobs?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          Similar things were stated during the times of the industrial revolution when machines
          were introduced. Obviously, it did not steal job opportunities. Instead, it paved the way
          for more jobs for humans to control them. Humans are intellectual beings. Hence, AI will
          simplify the complexity of human work but won’t actually take away your jobs!
          <br />
          <br /> - This content is from https://towardsdatascience.com/
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            What are the pros of AI?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          Apart from the previously discussed massive job opportunities created by AI, it also has
          other pros, such as the completion of looping or repetitive tasks that humans need to
          perform without the disadvantage of a human-prone error.
          <br />
          <br /> - This content is from https://towardsdatascience.com/
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            What are the cons of AI?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          Apart from consuming a lot of time and resources, the deployment of Artificial
          Intelligence models can also be quite expensive in some cases. Also, the maintenance costs
          in case of malfunctioning of the AI models in peculiar cases can be annoying to deal with
          and solve.
          <br />
          <br /> - This content is from https://towardsdatascience.com/
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            What are the applications of AI?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          Apart from consuming a lot of time and resources, the deployment of Artificial
          Intelligence models can also be quite expensive in some cases. Also, the maintenance costs
          in case of malfunctioning of the AI models in peculiar cases can be annoying to deal with
          and solve.
          <br />
          <br /> - This content is from https://towardsdatascience.com/
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            What are the cons of AI?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          Artificial Intelligence in the natural world has a wide variety of applications. These
          include your journey from the start of the day till the end of the day. When you usually
          start your day with your smartphone, you make use of the AI capabilities of smart face
          lock or other fingerprint AI measures to unlock your phone.
          <br />
          <br /> - This content is from https://towardsdatascience.com/
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}
export default Faq
