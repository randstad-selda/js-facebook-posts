export default class View {
  data;

  render(data) {
    // dati
    this.data = data;
    // genera il markup di tutti i post
    const markup = this.generateMarkup();
    // iniettare in pagina i post
    this.clear();
    this.parentElement.append(markup);
  }

  clear() {
    this.parentElement.innerHTML = "";
  }
}
