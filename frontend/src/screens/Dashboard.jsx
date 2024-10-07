import React from 'react';
import { CardDefault } from '../components/FunctionCard';

export default function Dashboard() {
  const cardData = [
    {
      name: 'Client Management',
      path: '/admin-dashboard',
      link: 'https://plus.unsplash.com/premium_photo-1661771773771-a093c948ba92?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      name: 'Inventory Management',
      path: '/inventory',
      link: 'https://images.unsplash.com/photo-1595348020949-87cdfbb44174?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      name: 'Package Management',
      path: '/package',
      link: 'https://media.istockphoto.com/id/1432903655/photo/finance-accounting-and-fintech-a-man-on-a-computer-and-calculator-working-out-his-business.webp?b=1&s=170667a&w=0&k=20&c=9q6fEaL4xFsF9VWNcwqUrhTysrwB_cpYwC4V6opkJy8=',
    },
    {
      name: 'Employee Management',
      path: '/employeefun',
      link: 'https://images.pexels.com/photos/1181304/pexels-photo-1181304.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      name: 'Supplier Management',
      path: '/supplierM',
      link: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?cs=srgb&dl=pexels-wendy-wei-1190298.jpg&fm=jpg',
    },
    {
      name: 'Progress Tracking Management',
      path: '/ProgressM',
      link: 'https://img.freepik.com/free-photo/full-shot-travel-concept-with-landmarks_23-2149153258.jpg',
    },
    {
      name: 'Schedule Management',
      path: '/schedulemanage',
      link: 'https://www.fitness-world.in/wp-content/uploads/2022/01/5-Reasons-Why-Your-Residential-Building-Needs-a-Professional-Gym-Banner-1200x620.jpg',
    },
    {
      name: 'Customer Affairness Management',
      path: '/adminfeedback',
      link: 'https://images.healthshots.com/healthshots/en/uploads/2023/07/20143449/hiking.jpg',
    },
  ];

  // Split cards into two groups
  const leftCards = cardData.slice(0, 4);
  const rightCards = cardData.slice(4, 8);

  return (
    <div className='mx-[200px] my-[50px]'>
      <div className='flex'>
        {/* Left Column */}
        <div className='flex flex-col w-1/2 space-y-4'>
          {leftCards.map((card, index) => (
            <CardDefault key={index} name={card.name} path={card.path} link={card.link} />
          ))}
        </div>
        {/* Right Column */}
        <div className='flex flex-col w-1/2 space-y-4'>
          {rightCards.map((card, index) => (
            <CardDefault key={index} name={card.name} path={card.path} link={card.link} />
          ))}
        </div>
      </div>
    </div>
  );
}
