import React from 'react'
import Link from 'gatsby-link'
import Container from "../components/container"
import Img from 'gatsby-image';

const ClassCardPage = ({ data }) => {
    return <Container backdrop={data.backdrop.sizes}>
        <div style={{
             border: '2em solid black',
            backgroundColor: 'white',
            padding: '1em',
            display: 'flex',
            flexDirection: 'column'
        
        }}>
            <p>Klippkorten gäller på Aveny Gym.</p>
            <p>Buy a class card by filling out this form below. You can pick up your class card next time you show up on the center.</p>
            <div style={{display: 'flex'}}>
                <div style={{flex: '0 0 30%'}}>
                    <Img sizes={data.classcardten.sizes}/>
                </div>
                <div style={{flex: '0 0 30%'}}>
                    <Img sizes={data.classcardtwenty.sizes} />
                </div>
                <div style={{flex: 1}}>
                <form name="classcard" method="POST" netlify netlify-honeypot="bot-field">
                    <input name="bot-field" type="hidden" />
                    <p>
                        <label>Your name: <input type="text" name="name" /></label>
                    </p>
                    <p>
                        <label>Your email: <input type="email" name="email" /></label>
                    </p>
                    <p>
                        <label>Select class card: <select name="type[]">
                            <option value="10">Class card 10</option>
                            <option value="20">Class card 20</option>
                        </select></label>
                    </p>
                    <p>
                        <label>Select payment method: <select name="payment[]">
                            <option value="swish">Swish</option>
                            <option value="invoice">Invoice</option>
                        </select></label>
                    </p>
                    <p>
                        <button type="submit">Order</button>
                    </p>
                </form>
                </div>
            </div>
        </div>
    </Container>
}

export default ClassCardPage

export const query = graphql`
  query classCardQuery {
    backdrop: contentfulAsset(title: {eq: "backdrop1"}) {
      sizes(quality: 100 maxWidth: 2500) {
       ...GatsbyContentfulSizes_withWebp
      }
    }

    classcardten: contentfulAsset(title: {eq: "Klippkort 10"}) {
        sizes(quality: 100 maxWidth: 200) {
            ...GatsbyContentfulSizes_withWebp
        }
    }

    classcardtwenty: contentfulAsset(title: {eq: "Klippkort 20"}) {
        sizes(quality: 100 maxWidth: 200) {
            ...GatsbyContentfulSizes_withWebp
        }
    }
  }
`