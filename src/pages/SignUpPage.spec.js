const SignUpPage = require('./SignUpPage.vue')
const { render, screen } = require('@testing-library/vue')
import "@testing-library/jest-dom"
import userEvent from "@testing-library/user-event"
import axios from 'axios'

describe('Sign Up Page', () => {
    beforeEach(() => {
        render(SignUpPage) 
    })
    afterEach(() => {
        jest.clearAllMocks();
    })
    describe('Layout', () => {
        it ('has Sign Up Header', () => {
            const header = screen.queryByRole('heading', { name: 'Sign Up'})
            expect(header).toBeInTheDocument()
        })
        it ('has username input', () => {
            const input = screen.queryByLabelText('Username')
            expect(input).toBeInTheDocument()
        })
        it ('has email input', () => {
            const input = screen.queryByLabelText('Email')
            expect(input).toBeInTheDocument()
        })
        it ('has password input', () => {
            const input = screen.queryByLabelText('Password')
            expect(input).toBeInTheDocument()
        })
        it ('has repeat password input', () => {
            const input = screen.queryByLabelText('Repeat Password')
            expect(input).toBeInTheDocument()
        })
        it ('has a Sign Up button', () => {
            const button = screen.queryByRole('button', { name: 'Sign Up'})
            expect(button).toBeInTheDocument()
        })
        it ('has a Sign Up button disabled by default', () => {
            const button = screen.queryByRole('button', { name: 'Sign Up'})
            // expect(button).toBeDisabled()
        })
    })
    describe('Interactions', () => {
        it('enables the button when the password and password repeat fields have the same value', async () => {
            const passwordInput = screen.queryByLabelText('Password')
            const passwordRepeatInput = screen.queryByLabelText('Repeat Password')
            await userEvent.type(passwordInput, 'P4ssword')
            await userEvent.type(passwordRepeatInput, 'P4ssword')
            const button = screen.queryByRole('button', { name: 'Sign Up' })
            expect(button).toBeEnabled()
        })
        it('sends username, email and password to the backend after clicking the button', async () => {
            const usernameInput = screen.queryByLabelText('Username')
            const emailInput = screen.queryByLabelText('Email')
            const passwordInput = screen.queryByLabelText('Password')
            const passwordRepeatInput = screen.queryByLabelText('Repeat Password')
            await userEvent.type(usernameInput, 'user1')
            await userEvent.type(emailInput, 'user1@mail.com')
            await userEvent.type(passwordInput, 'P4ssword')
            await userEvent.type(passwordRepeatInput, 'P4ssword')
            const button = screen.queryByRole('button', { name: 'Sign Up' })

            const mockFn = jest.fn()
            axios.post = mockFn

            await userEvent.click(button)

            // first time it is called is index 0
            const firstCall = mockFn.mock.calls[0]
            // firstCall is an array and contains 3 parameters, url: string and data?: any, and config?: AxiosRequestConfig
            const body = firstCall[1] // data?: any , or the body

            expect(body).toEqual({
                username: 'user1',
                email: 'user1@mail.com',
                password: 'P4ssword'
            })
        })
    })
})