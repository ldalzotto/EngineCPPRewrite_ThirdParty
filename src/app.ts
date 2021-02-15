util.load_stylesheet("./css/reset.css");
util.load_stylesheet("./css/layout.css");


class Todo {
    public el: HTMLElement;
    public static build(p_parent: HTMLElement, p_initial_text: string, on_up_clicked: () => void) {
        let l_todo = new Todo();
        l_todo.el = el.div(p_parent, {
            a: { class: "col", style: "width:100%" },
            c: _ => {
                el.div(_, {
                    a: { class: "row" },
                    c: _ => {
                        el.button(_, {
                            a: { class: "col", style: "width:10%" },
                            text_content: "U",
                            e: { click: on_up_clicked }
                        });
                        el.span(_, {
                            a: { class: "col", style: "width:90%" },
                            text_content: p_initial_text
                        });
                    }
                })
            }
        });
        return l_todo;
    };
};

class TodoPanel {
    public el: HTMLElement;
    public todos_array: ElArray2<Todo>;
    public input: bind.Binding<string>;

    public static build(p_parent: HTMLElement) {
        let l_panel = new TodoPanel();
        let l_el_input: HTMLInputElement = undefined;
        l_panel.el = el.div(p_parent, {
            a: { class: "col", style: "width:100%" },
            c: _ => {
                el.div(_, {
                    a: { class: "row" },
                    c: _ => {
                        el.span(_, { text_content: "Todo Panel" });
                    }
                });
                el.div(_, {
                    a: { class: "row" },
                    c: _ => {
                        el.div(_, {
                            a: { class: "col", style: "width:70%" },
                            c: _ => {
                                l_el_input = el.input(_, {
                                    a: { type: "text" }
                                });
                            }
                        });
                        el.button(_, {
                            a: { class: "col", style: "width:30%" },
                            text_content: "button",
                            e: { click: () => { l_panel.on_button_clicked(); } }
                        });
                    }
                });
                let l_todos_container = el.div(_, {
                    a: { class: "row" }
                });

                l_panel.todos_array = new ElArray2<Todo>(l_todos_container, [], []);
            }
        });

        l_panel.input = bind.input_text_element(l_el_input, "placeholder", undefined);

        return l_panel;
    };

    on_button_clicked() {

        let l_todo = Todo.build(document.body, this.input.bGet(), () => {
            let l_index = this.todos_array.get_htmlelement_index(l_todo.el);
            this.todos_array.swap_elements(l_index, l_index - 1);
        });

        this.todos_array.push_back_element(l_todo.el, l_todo);
    }
}

class App {
    el_app: HTMLElement;
    todo_panel: TodoPanel;

    public initialize() {
        this.el_app = el.create_element(document.body, "app", {
            a: { class: "col", style: "width:100%" }
        });
        this.todo_panel = TodoPanel.build(this.el_app);
    };
};

let app = new App();
app.initialize();