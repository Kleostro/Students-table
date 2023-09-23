const studentTableBody = document.querySelector('.student__table-tbody');

const studentNameInp = document.querySelector('.student__form-input-name');
const studentSurNameInp = document.querySelector('.student__form-input-surname');
const studentMiddleNameInp = document.querySelector('.student__form-input-middlename');
const studentBirthDayInp = document.querySelector('.student__form-input-birthday');
const studentYearEducationInp = document.querySelector('.student__form-input-education-year');
const studentFacultyInp = document.querySelector('.student__form-input-faculty');

const studentForm = document.querySelector('.student__form');
const studentFormBtn = document.querySelector('.student__form-btn');

const studentIndex = document.getElementById('index');
const studentNameTd = document.getElementById('name');
const studentBirthDay = document.getElementById('birthday');
const studentEducationYear = document.getElementById('education-year');
const studentFaculty = document.getElementById('faculty');

const filterNameInput = document.getElementById('filterName');
const filterFacultyInput = document.getElementById('filterFaculty');
const filterStartYearInput = document.getElementById('filterStartYear');
const filterEndYearInput = document.getElementById('filterEndYear');

let studentsArr = [
    {
        studentIndex: 1,
        studentName: 'Максим',
        studentSurName: 'Забалуев',
        studentMiddleName: 'Сергеевич',
        studentBirthDay: '2003-01-19',
        studentStartYearEducation: 2019,
        studentFaculty: 'Исторический'
    },
    {
        studentIndex: 2,
        studentName: 'Иван',
        studentSurName: 'Иванов',
        studentMiddleName: 'Иванович',
        studentBirthDay: '1999-10-12',
        studentStartYearEducation: 2021,
        studentFaculty: 'Медицинский'
    },
    {
        studentIndex: 3,
        studentName: 'Николай',
        studentSurName: 'Борисов',
        studentMiddleName: 'Николаевич',
        studentBirthDay: '2000-05-09',
        studentStartYearEducation: 2023,
        studentFaculty: 'Психологии'
    },
    {
        studentIndex: 4,
        studentName: 'Петр',
        studentSurName: 'Петров',
        studentMiddleName: 'Петрович',
        studentBirthDay: '1970-02-20',
        studentStartYearEducation: 2000,
        studentFaculty: 'Журналистики'
    },
    {
        studentIndex: 5,
        studentName: 'Александр',
        studentSurName: 'Александров',
        studentMiddleName: 'Александрович',
        studentBirthDay: '1982-10-12',
        studentStartYearEducation: 2002,
        studentFaculty: 'Философии'
    }
];

studentFormBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    let studentNameError = document.querySelector('.student__form-error-text-name');
    let studentSurNameError = document.querySelector('.student__form-error-text-surname');
    let studentMiddleNameError = document.querySelector('.student__form-error-text-middlename');
    let studentBirthDayError = document.querySelector('.student__form-error-text-birthday');
    let studentYearEducationError = document.querySelector('.student__form-error-text-education-year');
    let studentFacultyError = document.querySelector('.student__form-error-text-faculty');

    let studentNameValue = studentNameInp.value.trim();
    let studentSurNameValue = studentSurNameInp.value.trim();
    let studentMiddleNameValue = studentMiddleNameInp.value.trim();

    let studentBirthDayValue = studentBirthDayInp.value;
    const studentBirthDateObj = new Date(studentBirthDayValue);

    const day = studentBirthDateObj.getDate();
    const month = studentBirthDateObj.getMonth() + 1;
    const year = studentBirthDateObj.getFullYear();

    const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day}`;

    let studentYearEducationValue = Number(studentYearEducationInp.value);
    let studentFacultyValue = studentFacultyInp.value.trim();

    let isValidate = false;


    studentNameError.textContent = '';
    studentSurNameError.textContent = '';
    studentMiddleNameError.textContent = '';
    studentBirthDayError.textContent = '';
    studentYearEducationError.textContent = '';
    studentFacultyError.textContent = '';

    if (studentNameValue === '') {
        isValidate = true;
        studentNameError.textContent = 'Заполните поле';
    }

    if (studentSurNameValue === '') {
        isValidate = true;
        studentSurNameError.textContent = 'Заполните поле';
    }

    if (studentMiddleNameValue === '') {
        isValidate = true;
        studentMiddleNameError.textContent = 'Заполните поле';
    }

    if (studentBirthDayValue === '') {
        isValidate = true;
        studentBirthDayError.textContent = 'Заполните поле';
    } else if (studentBirthDateObj < new Date("1900-01-01")) {
        isValidate = true;
        console.log(studentBirthDateObj)
        studentBirthDayError.textContent = 'Мин. дата 1900-01-01';
    } else if (studentBirthDateObj > new Date()) {
        isValidate = true;
        studentBirthDayError.textContent = 'Дата не может быть больше текущей';
    }

    if (studentYearEducationValue === 0) {
        isValidate = true;
        studentYearEducationError.textContent = 'Заполните поле';
    } else if (studentYearEducationValue < 2000) {
        isValidate = true;
        studentYearEducationError.textContent = 'Год должен быть >= 2000';
    } else if (studentYearEducationValue > new Date().getFullYear()) {
        isValidate = true;
        studentYearEducationError.textContent = 'Год должен быть <= текущего';
    }

    if (studentFacultyValue === '') {
        isValidate = true;
        studentFacultyError.textContent = 'Заполните поле';
    }

    if (isValidate) return;

    const studentIndex = studentsArr.length + 1
    let newStudent = new Student(studentIndex, studentNameValue, studentSurNameValue, studentMiddleNameValue, formattedDate, studentYearEducationValue, studentFacultyValue);

    studentNameInp.value = '';
    studentSurNameInp.value = '';
    studentMiddleNameInp.value = '';
    studentBirthDayInp.value = '';
    studentYearEducationInp.value = '';
    studentFacultyInp.value = '';

    studentsArr.push(newStudent);
    render(studentsArr);
});

studentForm.addEventListener('submit', (e) => {
    e.preventDefault();
});

function Student(index, name, surName, middleName, birthday, startYear, faculty) {
    this.studentIndex = index;
    this.studentName = name,
        this.studentSurName = surName,
        this.studentMiddleName = middleName,
        this.studentBirthDay = birthday,
        this.studentStartYearEducation = startYear,
        this.studentFaculty = faculty
};

const getStudentAge = (studentBirthDay) => {
    const studentBirthDayObj = new Date(studentBirthDay);
    const studentBirthDayDifMs = Date.now() - studentBirthDayObj.getTime();
    const studentBirthDate = new Date(studentBirthDayDifMs);
    const studentAge = Math.abs(studentBirthDate.getUTCFullYear() - 1970);

    let yearsWord;
    const lastDigit = studentAge % 10;

    if (lastDigit === 1 && studentAge !== 11) {
        yearsWord = "год";
    } else if ((lastDigit >= 2 && lastDigit <= 4) && (studentAge < 10 || studentAge > 20)) {
        yearsWord = "года";
    } else {
        yearsWord = "лет";
    }

    const day = studentBirthDayObj.getDate();
    const month = studentBirthDayObj.getMonth() + 1;
    const year = studentBirthDayObj.getFullYear();

    const formattedAge = `${day < 10 ? "0" + day : day}.${month < 10 ? "0" + month : month}.${year} (${studentAge} ${yearsWord})`;

    return formattedAge;
};

const getStudentEducationYears = (studentStartYearEducation) => {
    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth();

    let startYear = currentMonth >= 8 ? studentStartYearEducation : studentStartYearEducation - 1;
    let endYear = startYear + 4;
    let result = '';

    let currentCourse = '';
    if (currentYear > endYear || (currentYear === endYear && currentMonth >= 8)) {
        result = `${startYear}-${endYear} (закончил)`
    } else {
        let totalCourses = 4;
        let courseDiff = currentYear - startYear;
        currentCourse = courseDiff > totalCourses ? totalCourses : courseDiff + 1;
        result = `${startYear}-${endYear} (${currentCourse} курс)`;
    }
    return result;
};

const render = (studentsArr) => {
    studentTableBody.innerHTML = '';

    for (let i = 0; i < studentsArr.length; i++) {
        const studentTr = document.createElement('tr');

        const indexTd = document.createElement('td');
        const nameTd = document.createElement('td');
        const BirthDayTd = document.createElement('td');
        const startYearEducationTd = document.createElement('td');
        const facultyTd = document.createElement('td');

        indexTd.classList.add('student__table-td');
        nameTd.classList.add('student__table-td');
        BirthDayTd.classList.add('student__table-td');
        startYearEducationTd.classList.add('student__table-td');
        facultyTd.classList.add('student__table-td');


        indexTd.textContent = studentsArr[i].studentIndex;
        nameTd.textContent = `${studentsArr[i].studentSurName} ${studentsArr[i].studentName} ${studentsArr[i].studentMiddleName}`;
        BirthDayTd.textContent = getStudentAge(studentsArr[i].studentBirthDay);
        startYearEducationTd.textContent = getStudentEducationYears(studentsArr[i].studentStartYearEducation);
        facultyTd.textContent = studentsArr[i].studentFaculty;

        studentTr.append(indexTd, nameTd, BirthDayTd, startYearEducationTd, facultyTd);
        studentTableBody.append(studentTr);
    }
};

const sortStudentsIndex = (studentsArr) => {
    studentsArr.sort((a, b) => {
        const facultyA = a.studentIndex;
        const facultyB = b.studentIndex;
        return facultyA - facultyB;
    });
};

studentIndex.addEventListener('click', () => {
    studentIndex.classList.add('sort');
    studentNameTd.classList.remove('sort');
    studentBirthDay.classList.remove('sort');
    studentEducationYear.classList.remove('sort');
    studentFaculty.classList.remove('sort');
    sortStudentsIndex(studentsArr)
    render(studentsArr)
})

const sortStudentsName = (studentsArr) => {
    studentsArr.sort((a, b) => {
        const fullNameA = `${a.studentSurName} ${a.studentName} ${a.studentMiddleName}`;
        const fullNameB = `${b.studentSurName} ${b.studentName} ${b.studentMiddleName}`;
        return fullNameA.localeCompare(fullNameB);
    });
};

studentNameTd.addEventListener('click', () => {
    studentIndex.classList.remove('sort');
    studentNameTd.classList.add('sort');
    studentBirthDay.classList.remove('sort');
    studentEducationYear.classList.remove('sort');
    studentFaculty.classList.remove('sort');
    sortStudentsName(studentsArr)
    render(studentsArr)
})

const sortStudentsBirthday = (studentsArr) => {
    studentsArr.sort((a, b) => {
        const dateA = new Date(a.studentBirthDay);
        const dateB = new Date(b.studentBirthDay);
        return dateA - dateB;
    });
};

studentBirthDay.addEventListener('click', () => {
    studentIndex.classList.remove('sort');
    studentNameTd.classList.remove('sort');
    studentBirthDay.classList.add('sort');
    studentEducationYear.classList.remove('sort');
    studentFaculty.classList.remove('sort');
    sortStudentsBirthday(studentsArr)
    render(studentsArr)
})

const sortStudentEducationYear = (studentsArr) => {
    studentsArr.sort((a, b) => {
        const yearA = a.studentStartYearEducation;
        const yearB = b.studentStartYearEducation;
        return yearA - yearB;
    });
};

studentEducationYear.addEventListener('click', () => {
    studentIndex.classList.remove('sort');
    studentNameTd.classList.remove('sort');
    studentBirthDay.classList.remove('sort');
    studentEducationYear.classList.add('sort');
    studentFaculty.classList.remove('sort');
    sortStudentEducationYear(studentsArr)
    render(studentsArr)
})

const sortStudentFaculty = (studentsArr) => {
    studentsArr.sort((a, b) => {
        const facultyA = a.studentFaculty;
        const facultyB = b.studentFaculty;
        return facultyA.localeCompare(facultyB);
    });
};

studentFaculty.addEventListener('click', () => {
    studentIndex.classList.remove('sort');
    studentNameTd.classList.remove('sort');
    studentBirthDay.classList.remove('sort');
    studentEducationYear.classList.remove('sort');
    studentFaculty.classList.add('sort');
    sortStudentFaculty(studentsArr)
    render(studentsArr)
})

const filterStudents = () => {
    const filterName = document.getElementById('filterName').value.toLowerCase();
    const filterFaculty = document.getElementById('filterFaculty').value.toLowerCase();
    const filterStartYear = document.getElementById('filterStartYear').value;
    const filterEndYear = document.getElementById('filterEndYear').value;

    console.log(filterStartYear)
    const filteredStudents = studentsArr.filter(student => {
        const fullName = `${student.studentSurName} ${student.studentName} ${student.studentMiddleName}`.toLowerCase();
        const endYearEducation = student.studentStartYearEducation + 4;
        return (
            fullName.includes(filterName) &&
            student.studentFaculty.toLowerCase().includes(filterFaculty) &&
            (filterStartYear === '' || student.studentStartYearEducation == filterStartYear) &&
            (filterEndYear === '' || endYearEducation == filterEndYear)
        );
    });

    render(filteredStudents);
}

const handleFiltersChange = () => {
    filterStudents();
}

filterNameInput.addEventListener('input', handleFiltersChange);
filterFacultyInput.addEventListener('input', handleFiltersChange);
filterStartYearInput.addEventListener('input', handleFiltersChange);
filterEndYearInput.addEventListener('input', handleFiltersChange);

render(studentsArr);

