package modules

// Описание таблиц базы данных
type User struct {
	ID       int
	Login    string
	Email    string
	Password string
	Type     string
}

type Author struct {
	ID    int
	Login string
}

type Course struct {
	ID          int
	Title       string
	Author      string
	Discription string
}

var courses []Course // Объект базы даннхы

// Заполнение таблицы Course
func init() {
	courses = []Course{
		{ID: 1, Title: "Курс по веб разработке", Author: "J.D. Salinger"},
		{ID: 2, Title: "To Kill a Mockingbird", Author: "Harper Lee"},
		{ID: 3, Title: "1984", Author: "George Orwell"},
	}
}

// Запрос курсов (GET)
func getAllBooks() []Course {
	return courses
}

// Запрос id курса (GET)
func getBookByID(id int) *Course {
	for _, course := range courses {
		if course.ID == id {
			return &course
		}
	}
	return nil
}

// Запрос для добавления курса (POST)
func addBook(book Course) {
	courses = append(courses, book)
}

// Запрос для обновления курса (PUT)
func updateBook(course Course) {
	for i, b := range courses {
		if b.ID == course.ID {
			courses[i] = course
			break
		}
	}
}

// Запрос для удаление курса (DELETE)
func deleteBook(id int) {
	for i, course := range courses {
		if course.ID == id {
			courses = append(courses[:i], courses[i+1:]...)
			break
		}
	}
}
