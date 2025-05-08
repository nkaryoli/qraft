import { Button } from './components/ui/button';
import './global.css'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <h1 className="text-4xl font-bold text-blue-500">¡Hola, Tailwind!</h1>
      <Button>Click me</Button>
    </div>
  );
};

export default App;