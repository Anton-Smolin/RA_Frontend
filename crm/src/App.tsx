import React from 'react';
import './App.css';
import { EmployeeCard } from './components/EmployeeCard';

interface EmployeeDto {
  id: number;
  firstName: string;
  patronymic: string;
  surName: string;
  fullName: string;
  position: string;
  startWorkDate: string;
  photo: string;
}

const employee: EmployeeDto = {
  "firstName": "Ирина",
  "patronymic": "Сергеевна",
  "surName": "Краснова",
  "position": "Мастер ногтевого сервиса",
  "photo": "",
  "startWorkDate": "2023-05-10T14:48:34.999Z",
  "id": 1,
  "fullName": "Краснова Ирина Сергеевна"
}

function App() {
  return (
    <div>
      <EmployeeCard />
    </div>
  );
}

export default App;
