import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
 
export function DefaultAccordion() {
  const [open, setOpen] = React.useState(1);
 
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
 
  return (
    <>
      <Accordion open={open === 1}>
        <AccordionHeader onClick={() => handleOpen(1)}>What Are the Benefits of Strength Training?</AccordionHeader>
        <AccordionBody>
          Strength training helps increase muscle mass, burn fat, and improve bone density. It also enhances overall physical endurance and promotes better mental health by releasing endorphins.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2}>
        <AccordionHeader onClick={() => handleOpen(2)}>
          How to Use Cardio Equipment Effectively?
        </AccordionHeader>
        <AccordionBody>
          To get the most out of cardio machines like treadmills, ellipticals, and stationary bikes, maintain proper posture and adjust the intensity and duration based on your fitness level. Start slow, then gradually increase speed and resistance.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 3}>
        <AccordionHeader onClick={() => handleOpen(3)}>
          What Are the Best Practices for Gym Etiquette?
        </AccordionHeader>
        <AccordionBody>
          Always wipe down equipment after use, re-rack weights, and avoid hogging machines during peak hours. Respect others' space and avoid using your phone while occupying machines.
        </AccordionBody>
      </Accordion>
    </>
  );
}
