# Canoe Intelligence - Technical Exercise

This excercise took me a little bit more than 2 hours. But just because I wanted to add a couple of interesting things. 

1. Please note that for the main page I've designed my own component using tailwindcss
2. I am using Pinia and Pinia persisted data to store the value of the comunity selector

## Please consider
I have decided to use NuxtJS because is a great framework that works on top of VueJS and makes the development much easier. It allows the use of plugins such as TailwindCS, ElementUI, Pinia, Pinia Persisted State, and other such as Google Fonts (I am not including here). 

I have decided to use ElementUI instead of Vuetify becuase i think ElementUI is a great tool to create Admin Dashboards. I have a lot of experience using it and it works perfectly fine. Please note I could integrate veutify  without a problem.

I am using TailwindCSS because lately is one of the best options to apply utility clasess to front ends. 

I decided to use Pinia and Pinia Persisted State because Pinia happens to be the suggested store for vuejs 3. and Pinia Persisted State because it allows to use either cookies, Local Storage or Session Storage for persisted states. 

## Functionality
This exercise already includes some communities to switch beetween. But you can add more by clicking the + button and adding the required details. Please consider those additions will be stored in the browser persisted data. As soon as you add for example `beamazed (Internet Culture and Memes)` it will be added to the Select to be choosen. the Dialog for new community will also validate required fields

You can search using the "Search by topic" input. This will trigger a method with a waiting period of 1s to find the matching results. As I did not investigated more about the API i decided to filter using a JS method that will convert to lowercase the title and the search value and then check if the search value is within the title string. I am using a debounce method to wait a decent period of time so it does not trigger on every key press

I have added a filter with 4 diferent options. A to Z, Z to A (by title), Newest to Oldest, Oldest to Newest (by creation date)

I have added a navigation functionality that will ask to confirm if indeed the user wants to navigate outside the site, the it will open new tab with the URL

I have implemented
* responsive design
* Error handling
* Row selection
* Data export: I used PDFMake and I was thinking to export to XLSX but i ran out of time, but I would do it using exceljs


## Setup

Make sure to install the dependencies:

```bash
# pnpm
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# pnpm
pnpm run dev
```

## Production

Build the application for production:

```bash
# pnpm
pnpm run build
```

Locally preview production build:

```bash
# pnpm
pnpm run preview
```
