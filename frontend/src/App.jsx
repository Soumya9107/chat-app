import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/react";
import { Button } from '@heroui/react';

function App() {
  return (
    <div>
      <h1 className="text-4xl text-red-500 bg-blue-400">MY APP</h1>
      <Button>My Button</Button>

      <header>
        <Show when="signed-out">
          <SignInButton mode="modal" />
          <SignUpButton mode="modal" />
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </header>
    </div>
  );
}

export default App;
