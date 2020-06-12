import React from 'react'
import { loginUser } from '../../lib/api'
import { setToken } from '../../lib/auth'
import { Redirect } from 'react-router-dom'

class Login extends React.Component {
  state = {
    formData: {
      email: '',
      password: ''
    },
    redirect: false,
    loading: false,
    error: ''
  }

  handleChange = event => {
    const formData = { ...this.state.formData, [event.target.name]: event.target.value }
    this.setState({ formData, error: '' })
  }

  handleSubmit = async event => {
    event.preventDefault()

    try {
      this.setState({ loading: true })
      const res = await loginUser(this.state.formData)
      setToken(res.data.token)
      
      this.setState({ redirect: true })
      
    } catch (err) {
      this.setState({ error: 'Invalid Credentials', loading: false })
    }
  }
  sendData = () => {
    this.props.history.push('/register')
  }

  handleClick = () => {
    this.props.sendData(true)
  }

  renderRedirect = () => {
    
    if (this.state.redirect){
      
      return <Redirect to="/" />
    }
  }

  render() {
    const { formData, error, loading } = this.state
    return (
      <section className="section">
        {this.renderRedirect()}
        <div className="container">
          <div className="columns">
            <form onSubmit={this.handleSubmit} className="column">
              <div className="field">
                <div className="control">
                  <input
                    className={`input ${error ? 'is-danger' : '' }`}
                    placeholder="Email"
                    name="email"
                    onChange={this.handleChange}
                    value={formData.email}
                  />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <input
                    type="password"
                    className={`input ${error ? 'is-danger' : ''}`}
                    placeholder="Password"
                    name="password"
                    onChange={this.handleChange}
                    value={formData.password}
                  />
                </div>
                {error && <small className="help is-danger">{error}</small>}
              </div>
              <div className="field">
                <button type="submit" className={`button is-fullwidth login-button ${loading ? 'is-loading' : ''}`}>Login</button>
              </div>
              <div className="field">
              
                <button onClick={this.sendData}type="button" className="button is-fullwidth is-outlined is-register">No Account? Sign Up Here</button>
            
              </div>
            </form>
          </div>
        </div>
      </section>
    )
  }
}

export default Login
