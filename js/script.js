
/* =====================================================
   1. MOBILE MENU
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

  const menuBtn = document.getElementById("menuBtn");
  const links = document.getElementById("links");

  if (!menuBtn || !links) return;

  menuBtn.addEventListener("click", function (event) {

    event.preventDefault();
    event.stopPropagation();

    links.classList.toggle("open");

    const isOpen = links.classList.contains("open");

    menuBtn.setAttribute(
      "aria-expanded",
      isOpen ? "true" : "false"
    );

  });

  /* Menu link click hone ke baad close */
  links.querySelectorAll("a").forEach(function (link) {

    link.addEventListener("click", function () {

      links.classList.remove("open");

      menuBtn.setAttribute(
        "aria-expanded",
        "false"
      );

    });

  });

});


/* =====================================================
   2. PROGRAM TABS
   Hifz / Alimiyyah / Maktab / Modern Subjects
===================================================== */

const programTabs = document.querySelectorAll(".tab");
const programPanels = document.querySelectorAll(".panel");


if (programTabs.length > 0 && programPanels.length > 0) {

  function showProgram(selectedTab) {

    // Sabhi tabs inactive
    programTabs.forEach(function (tab) {

      tab.setAttribute(
        "aria-selected",
        "false"
      );

      tab.setAttribute(
        "tabindex",
        "-1"
      );

    });


    // Sabhi panels hide
    programPanels.forEach(function (panel) {

      panel.hidden = true;

    });


    // Selected tab active
    selectedTab.setAttribute(
      "aria-selected",
      "true"
    );

    selectedTab.setAttribute(
      "tabindex",
      "0"
    );


    // Selected panel find karo
    const panelId =
      selectedTab.getAttribute("aria-controls");

    const selectedPanel =
      document.getElementById(panelId);


    // Selected panel show
    if (selectedPanel) {

      selectedPanel.hidden = false;

    }

  }


  // Har tab par click
  programTabs.forEach(function (tab) {

    tab.addEventListener("click", function () {

      showProgram(tab);

    });

  });


  // Keyboard support
  programTabs.forEach(function (tab, index) {

    tab.addEventListener("keydown", function (event) {

      let nextTab = null;


      // Right / Down
      if (
        event.key === "ArrowRight" ||
        event.key === "ArrowDown"
      ) {

        nextTab =
          programTabs[
            (index + 1) % programTabs.length
          ];

      }


      // Left / Up
      if (
        event.key === "ArrowLeft" ||
        event.key === "ArrowUp"
      ) {

        nextTab =
          programTabs[
            (index - 1 + programTabs.length)
            % programTabs.length
          ];

      }


      if (nextTab) {

        event.preventDefault();

        nextTab.focus();

        showProgram(nextTab);

      }

    });

  });


  // Page load par Hifz selected
  const firstTab = document.querySelector(".tab");

  if (firstTab) {

    showProgram(firstTab);

  }

}


/* =====================================================
   3. ADMISSION FORM → MONGODB
===================================================== */

const enquiryForm =
    document.getElementById("enquiry");


if (enquiryForm) {

    enquiryForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const status =
                document.getElementById("status");


            const guardian =
                document
                    .getElementById("guardian")
                    .value
                    .trim();


            const student =
                document
                    .getElementById("student")
                    .value
                    .trim();


            const program =
                document
                    .getElementById("program")
                    .value;


            const phone =
                document
                    .getElementById("phone")
                    .value
                    .trim();


            const email =
                document
                    .getElementById("email")
                    .value
                    .trim();


            const dateOfBirth =
                document
                    .getElementById("dateOfBirth")
                    .value;


            const address =
                document
                    .getElementById("address")
                    .value
                    .trim();


            const note =
                document
                    .getElementById("note")
                    .value
                    .trim();


            // Required fields

            if (
                !guardian ||
                !student ||
                !phone ||
                !program ||
                !address
            ) {

                status.textContent =
                    "Please fill all required fields.";

                status.style.color =
                    "red";

                return;
            }


            // Loading message

            status.textContent =
                "Submitting your enquiry...";

            status.style.color =
                "#073b36";


            try {

                const response =
                    await fetch(
                        "http://localhost:5000/api/admissions",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({

                                studentName:
                                    student,

                                fatherName:
                                    guardian,

                                mobile:
                                    phone,

                                email:
                                    email,

                                program:
                                    program,

                                dateOfBirth:
                                    dateOfBirth,

                                address:
                                    address,

                                message:
                                    note

                            })
                        }
                    );


                const data =
                    await response.json();


                if (!response.ok) {

                    throw new Error(
                        data.message ||
                        "Admission submission failed"
                    );

                }


                // Success

                status.textContent =
                    "Admission enquiry submitted successfully ✅";

                status.style.color =
                    "green";


                // Clear form

                enquiryForm.reset();


            } catch (error) {

                console.error(
                    "Admission Error:",
                    error
                );


                status.textContent =
                    "Unable to submit enquiry. Please try again.";

                status.style.color =
                    "red";

            }

        }
    );

}

/* =====================================================
   4. SMOOTH SCROLL
===================================================== */

document
  .querySelectorAll('a[href^="#"]')
  .forEach(function (link) {

    link.addEventListener(
      "click",
      function (event) {

        const targetId =
          this.getAttribute("href");

        if (
          targetId &&
          targetId !== "#"
        ) {

          const target =
            document.querySelector(targetId);

          if (target) {

            event.preventDefault();

            target.scrollIntoView({
              behavior: "smooth",
              block: "start"
            });

          }

        }

      }
    );

  });



  /* =========================
   ISLAMIC CALENDAR JS
========================= */

const hijriMonths = [
  "Muharram",
  "Safar",
  "Rabi al-Awwal",
  "Rabi al-Thani",
  "Jumada al-Awwal",
  "Jumada al-Thani",
  "Rajab",
  "Sha'ban",
  "Ramadan",
  "Shawwal",
  "Dhul-Qadah",
  "Dhul-Hijjah"
];

const hijriFormatter = new Intl.DateTimeFormat(
  "en-u-ca-islamic-umalqura",
  {
    day:"numeric",
    month:"numeric",
    year:"numeric"
  }
);

const hijriMonthFormatter = new Intl.DateTimeFormat(
  "en-u-ca-islamic-umalqura",
  {
    month:"numeric",
    year:"numeric"
  }
);

const gregorianFormatter = new Intl.DateTimeFormat(
  "en-IN",
  {
    day:"numeric",
    month:"short",
    year:"numeric"
  }
);


function getHijri(date){

  const parts = hijriFormatter
    .formatToParts(date)
    .reduce((obj,item)=>{
      obj[item.type] = item.value;
      return obj;
    },{});

  return {
    day:Number(parts.day),
    month:Number(parts.month),
    year:Number(parts.year)
  };

}


const today = new Date();

const todayHijri = getHijri(today);

let currentHijriYear = todayHijri.year;
let currentHijriMonth = todayHijri.month;


/* =========================
   GET GREGORIAN DATE RANGE
========================= */

function findGregorianDates(hYear,hMonth){

  const dates = [];

  let start = new Date();

  start.setDate(start.getDate() - 400);

  for(let i=0;i<900;i++){

    const date = new Date(start);
    date.setDate(start.getDate()+i);

    const h = getHijri(date);

    if(
      h.year === hYear &&
      h.month === hMonth
    ){
      dates.push(date);
    }

  }

  return dates;
}


document.addEventListener("DOMContentLoaded", () => {

    // ==============================
    // ELEMENTS
    // ==============================
    const calendarTitle = document.getElementById("calendarTitle");
    const calendarSubtitle = document.getElementById("calendarSubtitle");

    const todayHijri = document.getElementById("todayHijri");
    const todayGregorian = document.getElementById("todayGregorian");

    const calendarGrid = document.getElementById("calendarGrid");

    const prevMonthBtn = document.getElementById("prevMonth");
    const nextMonthBtn = document.getElementById("nextMonth");


    // ==============================
    // CHECK BROWSER SUPPORT
    // ==============================
    let hijriFormatter;

    try {
        hijriFormatter = new Intl.DateTimeFormat(
            "en-u-ca-islamic-umalqura",
            {
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );
    } catch (error) {
        console.error("Islamic calendar is not supported:", error);

        calendarTitle.textContent = "Islamic Calendar";
        calendarSubtitle.textContent =
            "Your browser does not support the Islamic calendar.";

        return;
    }


    // ==============================
    // GET HIJRI DATE
    // ==============================
    function getHijriParts(date) {

        const parts = hijriFormatter.formatToParts(date);

        const result = {};

        parts.forEach(part => {
            if (part.type !== "literal") {
                result[part.type] = part.value;
            }
        });

        return {
            day: parseInt(result.day),
            month: result.month,
            year: parseInt(result.year)
        };
    }


    // ==============================
    // TODAY
    // ==============================
    function showToday() {

        const today = new Date();

        const hijri = getHijriParts(today);

        const gregorianFormatter = new Intl.DateTimeFormat(
            "en-IN",
            {
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );

        todayHijri.textContent =
            `${hijri.day} ${hijri.month} ${hijri.year} AH`;

        todayGregorian.textContent =
            gregorianFormatter.format(today);
    }


    // ==============================
    // GET MONTH INFO
    // ==============================
    function getMonthInfo(date) {

        const hijri = getHijriParts(date);

        return {
            year: hijri.year,
            month: hijri.month
        };
    }


    // ==============================
    // FIND FIRST DAY OF HIJRI MONTH
    // ==============================
    function findFirstDayOfHijriMonth(targetYear, targetMonth) {

        const today = new Date();

        // Approximate Gregorian year
        const approximateYear =
            today.getFullYear() +
            (targetYear - getHijriParts(today).year) * 0.97;

        const startDate = new Date(
            Math.floor(approximateYear) - 2,
            0,
            1
        );

        const endDate = new Date(
            Math.floor(approximateYear) + 2,
            11,
            31
        );

        const current = new Date(startDate);

        while (current <= endDate) {

            const hijri = getHijriParts(current);

            if (
                hijri.year === targetYear &&
                hijri.month === targetMonth
            ) {
                return new Date(current);
            }

            current.setDate(current.getDate() + 1);
        }

        return null;
    }


    // ==============================
    // FIND LAST DAY OF MONTH
    // ==============================
    function findLastDayOfHijriMonth(firstDay, targetYear, targetMonth) {

        const current = new Date(firstDay);

        let lastDay = new Date(firstDay);

        for (let i = 0; i < 35; i++) {

            const hijri = getHijriParts(current);

            if (
                hijri.year !== targetYear ||
                hijri.month !== targetMonth
            ) {
                break;
            }

            lastDay = new Date(current);

            current.setDate(current.getDate() + 1);
        }

        return lastDay;
    }


    // ==============================
    // RENDER CALENDAR
    // ==============================
    function renderCalendar(date) {

        calendarGrid.innerHTML = "";

        const hijriInfo = getMonthInfo(date);

        const firstDay = findFirstDayOfHijriMonth(
            hijriInfo.year,
            hijriInfo.month
        );

        if (!firstDay) {

            calendarTitle.textContent = "Islamic Calendar";
            calendarSubtitle.textContent =
                "Unable to load this Hijri month.";

            return;
        }

        const lastDay = findLastDayOfHijriMonth(
            firstDay,
            hijriInfo.year,
            hijriInfo.month
        );


        // ==============================
        // HEADER
        // ==============================
        calendarTitle.textContent =
            `${hijriInfo.month} ${hijriInfo.year} AH`;

        calendarSubtitle.textContent =
            "Hijri Calendar";


        // ==============================
        // EMPTY DAYS
        // ==============================
        const firstWeekDay = firstDay.getDay();

        for (let i = 0; i < firstWeekDay; i++) {

            const emptyCell = document.createElement("div");

            emptyCell.className = "calendar-day empty";

            calendarGrid.appendChild(emptyCell);
        }


        // ==============================
        // DAYS
        // ==============================
        const current = new Date(firstDay);

        while (current <= lastDay) {

            const hijri = getHijriParts(current);

            const day = document.createElement("div");

            day.className = "calendar-day";


            // Gregorian date
            const gregorianDate =
                current.getDate();


            // Today check
            const today = new Date();

            if (
                current.getFullYear() === today.getFullYear() &&
                current.getMonth() === today.getMonth() &&
                current.getDate() === today.getDate()
            ) {
                day.classList.add("today");
            }


            day.innerHTML = `
                <span class="hijri-day">
                    ${hijri.day}
                </span>

                <span class="gregorian-day">
                    ${gregorianDate}
                </span>
            `;


            calendarGrid.appendChild(day);

            current.setDate(current.getDate() + 1);
        }
    }


    // ==============================
    // MONTH NAVIGATION
    // ==============================
    let currentDate = new Date();


    function changeMonth(direction) {

        /*
         * Instead of changing Gregorian month directly,
         * move approximately one Hijri month.
         */

        currentDate.setDate(
            currentDate.getDate() +
            (direction * 30)
        );

        renderCalendar(currentDate);
    }


    // ==============================
    // BUTTONS
    // ==============================
    if (prevMonthBtn) {

        prevMonthBtn.addEventListener("click", () => {
            changeMonth(-1);
        });

    }


    if (nextMonthBtn) {

        nextMonthBtn.addEventListener("click", () => {
            changeMonth(1);
        });

    }


    // ==============================
    // INITIALIZE
    // ==============================
    try {

        showToday();

        renderCalendar(currentDate);

    } catch (error) {

        console.error("Calendar error:", error);

        calendarTitle.textContent =
            "Islamic Calendar";

        calendarSubtitle.textContent =
            "Unable to load calendar.";

    }

});


/* =========================================================
   LEADERSHIP PAGE JAVASCRIPT
========================================================= */


/* =========================================================
   MOBILE MENU
========================================================= */

const leadershipMenuBtn =
  document.getElementById("menuBtn");

const leadershipLinks =
  document.getElementById("links");


if (
  leadershipMenuBtn &&
  leadershipLinks
) {

  leadershipMenuBtn.addEventListener(
    "click",
    function () {

      const isOpen =
        leadershipLinks.classList.toggle("open");

      leadershipMenuBtn.setAttribute(
        "aria-expanded",
        isOpen
      );

    }
  );


  /* Close menu after clicking a link */

  leadershipLinks
    .querySelectorAll("a")
    .forEach(function (link) {

      link.addEventListener(
        "click",
        function () {

          leadershipLinks.classList.remove(
            "open"
          );

          leadershipMenuBtn.setAttribute(
            "aria-expanded",
            "false"
          );

        }
      );

    });

}


/* =========================================================
   MORE DROPDOWN
========================================================= */

const leadershipDropdownBtn =
  document.querySelector(".dropdown-btn");

const leadershipDropdown =
  document.querySelector(".nav-dropdown");


if (
  leadershipDropdownBtn &&
  leadershipDropdown
) {

  leadershipDropdownBtn.addEventListener(
    "click",
    function (event) {

      event.stopPropagation();

      leadershipDropdown.classList.toggle(
        "active"
      );

    }
  );


  /* Close dropdown when clicking outside */

  document.addEventListener(
    "click",
    function (event) {

      if (
        !leadershipDropdown.contains(
          event.target
        )
      ) {

        leadershipDropdown.classList.remove(
          "active"
        );

      }

    }
  );

}


/* =========================================================
   LEADERSHIP PAGE SCROLL
========================================================= */

document
  .querySelectorAll(
    '.leadership-page a[href^="#"]'
  )
  .forEach(function (link) {

    link.addEventListener(
      "click",
      function (event) {

        const targetId =
          this.getAttribute("href");


        if (
          targetId &&
          targetId !== "#"
        ) {

          const target =
            document.querySelector(
              targetId
            );


          if (target) {

            event.preventDefault();


            target.scrollIntoView({
              behavior: "smooth",
              block: "start"
            });

          }

        }

    }
    );

});

