require('./bootstrap');
require ('dayjs/locale/es')

import React from 'react';
import { render } from 'react-dom';

import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './Layouts/theme';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { createInertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => require(`./Pages/${name}`),
    setup({ el, App, props }) {
        return render(<>
            <ThemeProvider theme={theme}>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                <CssBaseline/>
                    <App {...props} />
                </LocalizationProvider>
            </ThemeProvider>
        </>, el);
    },
});

InertiaProgress.init({ color: '#4B5563' });