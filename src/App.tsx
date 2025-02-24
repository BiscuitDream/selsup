import './App.css'
import {Model, Param, ParamEditor} from './ParamEditor';

const params: Param[] = [
  {
    "id": 1,
    "name": "Назначение"
  },
  {
    "id": 2,
    "name": "Длина"
  }
];

const model: Model = {
  "paramValues": [
    {
      "paramId": 1,
      "value": "повседневное"
    },
    {
      "paramId": 2,
      "value": "макси"
    }
  ]
};

function App() {
  return (
    <div>
      <ParamEditor
          params={params}
          model={model}
      />
    </div>
  )
}

export default App
