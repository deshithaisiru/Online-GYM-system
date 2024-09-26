import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
  
  export function CardDefault() {
    return (
      <Card className="mt-6 w-96">
        <CardHeader color="blue-gray" className="relative h-56">
          <img
            src="https://images.pexels.com/photos/949127/pexels-photo-949127.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="gym-equipment"
          />
        </CardHeader>
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            Strength Training Equipment
          </Typography>
          <Typography>
            Our gym is equipped with the latest strength training equipment to help you achieve your fitness goals. From barbells to squat racks, we have everything you need for an intense workout session.
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <Button color="blue" variant="filled">
            Learn More
          </Button>
        </CardFooter>
      </Card>
    );
  }
  