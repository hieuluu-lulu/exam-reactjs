/** @format */

import { Observer } from 'mobx-react-lite';
import { useState } from 'react';
import './App.css';
import { useTodoContext } from './MobX-Store/TodoContext';
import { Button, ButtonAdd, ButtonUpdate, Container, ContainerGrid, FlexBox, Input } from './Styled Component/Container';
import { GlobalStyle } from './Styled Component/GlobalStyle';
import { Table } from './Styled Component/Table';
function App() {
	const todoStore = useTodoContext();
	const [input, setInput] = useState('');
	const [inputUpdate, setInputUpdate] = useState('');
	const handleAddTodo = () => {
		todoStore.addTodo(input);
		setInput('');
	};
	return (
		<Observer>
			{() => (
				<>
					<GlobalStyle black />
					<Container>
						<ContainerGrid>
							<FlexBox style={{ marginTop: '30px' }}>
								<Input value={input} onChange={(e) => setInput(e.target.value)} />
								<ButtonAdd onClick={() => handleAddTodo()}>Add Todo</ButtonAdd>
							</FlexBox>

							<Table>
								<Table.Head>
									<Table.TR>
										<Table.TH>#N.O</Table.TH>
										<Table.TH>List Todo</Table.TH>
										<Table.TH>Action</Table.TH>
									</Table.TR>
								</Table.Head>
								<Table.Body>
									{todoStore.todos.map((item, index) => (
										<Table.TR key={item.id}>
											<Table.TD>{index + 1}</Table.TD>
											<Table.TD>{item.title}</Table.TD>
											<Table.TD>
												<FlexBox>
													<Button background onClick={() => todoStore.removeTodo(item.id)}>
														Delete
													</Button>
													<ButtonUpdate onClick={() => todoStore.updateTodo(item.id, inputUpdate)}>Update</ButtonUpdate>
													<Input defaultValue={item.title} onChange={(e) => setInputUpdate(e.target.value)} />
												</FlexBox>
											</Table.TD>
										</Table.TR>
									))}
								</Table.Body>
							</Table>
						</ContainerGrid>
					</Container>
				</>
			)}
		</Observer>
	);
}

export default App;
