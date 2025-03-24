# Upciti x Camille Coutens - Dashboard example

![Screen](https://res.cloudinary.com/augalo/image/upload/v1742758161/work/desktop_klvnyt.png)

This project is a Vue 3 application that visualizes hourly data using bar charts and displays key performance indicators (KPI).

##  Getting started

### Installation

1. **Clone the repository:**

   ```bash
   git git@github.com:Kamsou/upciti-challenge.git
   ```

2. **Install dependencies:**

   ```bash
   yarn
    ```

3. **Open the app :**

   ```bash
   yarn dev
   ```

4. **Run the tests:**

   ```bash
   yarn test:unit
   ```

### Docker

1. **Launch the app in a Docker container:**

   ```bash
   docker-compose up
   ```

2. **Stop the Docker container:**

   ```bash
   docker-compose down
   ```

## Librairies and Tools

- **Vue 3**: Chosen for its reactivity and simplicity in managing component states.
- **TypeScript**: Used for static typing, which improves code robustness and maintainability.
- **Vite**: Selected for its fast build times and excellent development experience.
- **Vue Chartjs**: Used for creating the bar charts. It is a wrapper around Chart.js.
- **Vitest**: Used for testing the application components and utilities.
- **TailwindCSS**: Used for styling the application components and utilities.
- **Eslint**: Used for linting the codebase and ensuring code consistency. With antfu's eslint-config.
- **Dayjs**: Used for date manipulation and formatting.

## Limitations or Known Issues
- **Data Fetching**: The application currently fetches data from a hardcoded API endpoint. This could be made configurable.
- **Error Handling**: Basic error handling is implemented, but it could be improved with monitoring and logging.
- **Testing**: Limited unit tests are currently in place; more extensive testing would be beneficial.
- **Browser Compatibility**: The application has been tested on modern browsers and may not work on older browsers.
- **Environment Variables**: This application does not use environment variables, which could be useful for configuration.

## Future Improvements
- **Enhanced Interactivity**: Add more interactive features to the charts, such as zooming.
- **Responsive Design**: Improve the application's responsiveness for different screen sizes.
- **Real-time Data**: Implement real-time data updates using WebSockets, polling or debounce.
- **Internationalization**: Add support for multiple languages.
- **User Authentication**: Implement user authentication and authorization.
- **Dark Mode**: Add a dark mode theme for the application.
- **Tooltip management**: Add tooltips to prevent users of available data.
- **Accessibility**: The application is not fully accessible and could be improved for users with disabilities.
