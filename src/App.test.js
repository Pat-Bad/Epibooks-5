import { fireEvent, render, screen } from "@testing-library/react";
//import App from "./App";
import Welcome from "./components/Welcome";
//import AllTheBooks from "./components/AllTheBooks";
import SingleComment from "./components/SingleComment";
import BookList from "./components/BookList";
import SingleBook from "./components/SingleBook";
import { click } from "@testing-library/user-event/dist/click";
import { Card } from "react-bootstrap";
import { fantasy } from "../src/data/fantasy.json";
//import { Button } from "react-bootstrap";

//test("renders learn react link", () => {
//render(<App />);
//const linkElement = screen.getByText(/learn react/i);
//expect(linkElement).toBeInTheDocument();
//});

//verificare che Welcome venga montato - cioè verificare che si veda nella pagina Benvenuti in Epicode

it("shows Welcome alert", () => {
  render(<Welcome />);
  const WelcomeMessage = screen.getByText(/benvenuti/i);
  expect(WelcomeMessage).toBeInTheDocument();
});

//verificare che il numero delle cards corrisponda al numero dei file nel json. AlltheBooks mappa i libri da fantasy. Che il numero di card sia uguale alla lunghezza del json?

//it("renders same amount of cards as books in json file", () => {
//render(<AllTheBooks />);
//const AmountOfCards = screen.queryAllByTestId("test-card");

//expect(AmountOfCards).toHaveLength();
//});

//verificare che CommentArea venga renderizzato. è async e fa una fetch. Si vede una lista dei commenti. Prendo l'altro componente, che se me lo monta vuol dire che monta comment area! non funziona, errore per .filter... è asincrono????

it("displays CommentArea component correctly", async () => {
  render(<SingleComment />);
  const DeleteButton = await screen.findByText(/elimina/i);

  expect(DeleteButton).toBeInTheDocument();
});

//verifica che la barra di ricerca dei libri funzioni correttamente. errore nella lettura dell'asin?

it("renders searched book title", async () => {
  render(<BookList />, <SingleBook />);
  const input = screen.getAllByPlaceholderText(/cerca un libro/i);
  fireEvent.change(input, { target: { value: "magician" } });
  const arrayOfSearchedBooks = await screen.findAllByTestId(
    "test-searched-book"
  );
  expect(arrayOfSearchedBooks).toBeGreaterThan(0);
});

//verificare che il bordo del libro selezionato cambi colore

it("changes border colour when selected", () => {
  render(<SingleBook />);
  const Book = screen.getByTestId("test-searched-book");
  fireEvent.click(screen.getAllByTestId("test-searched-book"));
  expect(Book).toHaveStyle("3px solid red");
});

//7. verificare che all'avvio della pagina non ci sia il componente singlecomment. errore nella lettura di filter

it("does not display SingleComment component when page loads", () => {
  render(<SingleComment />);
  const DeleteButton = screen.queryByLabelText(/elimina/i);

  expect(DeleteButton).toBeNull();
});
