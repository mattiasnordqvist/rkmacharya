import React from 'react'
import Link from 'gatsby-link'
import Container from "../components/container"
import Img from 'gatsby-image';

const IndexPage = ({data}) => {
  return <Container backdrop={data.backdrop.sizes}>
    <span className="quote"
     style={{    
        paddingTop: '20%',
    }}
    >“</span>
    <h1 style={{
          marginTop: '-40px',
          display: 'block',
          lineHeight: '1.8em',
          color: '#fff',
          letterSpacing: '0.0517241em',
          textAlign: 'center',
          fontWeight: '600',
          fontStyle: 'normal',
          fontSize: '30px',
          fontFamily: 'Times'

    }}>
      Merging of the universal soul<br/> into a human body is Yoga
    </h1>
    <div style={{paddingTop: '500px',}}>
    <div className="textblock">
      <h1>RKM Acharya Yoga</h1>
      <p>
        RKM Acharya Yoga is a systematised sequence of yogasana and pranayama. Its purpose is to help individual practitioners gain a better understanding of sharira mana shastra—the science of body and mind—and fine-tune their awareness of the vibrational energy that flows through the body and the nervous system.
    </p>
      <p>
        RKM Acharya has systematised 108 classical Hatha yoga asanas and 41 types of Pranayama that prepare the practitioner for the practice of Dhyana (meditation). This slow-paced asana practice invites the practitioner to move according to his or her own body condition. Practicing the asana with precision will stimulate the practitioner’s perception of the proper functioning of the organs and senses. The physical practice of yoga will sculpt a strong and healthy body, which awakens an internal and instinctive intelligence. This internal intelligence will steady the mind and help guide one through the various stages of life.
    </p>
      <p>
        The awareness that is cultivated through the practice of asana improves the strength and mobility of the skeletal and muscular systems. As a result, the mind itself becomes more deeply interested in questioning and taking charge of lifestyle choices. The softening and rejuvenation of the flesh, i.e. the general health of the entire body, leads to a deeper connection with the primordial mind.
    </p>
      <p>
        RKM Acharya Yoga is a holistic education that brings the student into health and harmony. It is suitable for anyone looking to balance and clear the body and mind, as well as anyone seeking to lead a life with full conscious awareness.
    </p>
    </div>


     <div className="textblock">
      <h1>RKM Acharya Yoga</h1>
      <p>
        RKM Acharya Yoga is a systematised sequence of yogasana and pranayama. Its purpose is to help individual practitioners gain a better understanding of sharira mana shastra—the science of body and mind—and fine-tune their awareness of the vibrational energy that flows through the body and the nervous system.
    </p>
      <p>
        RKM Acharya has systematised 108 classical Hatha yoga asanas and 41 types of Pranayama that prepare the practitioner for the practice of Dhyana (meditation). This slow-paced asana practice invites the practitioner to move according to his or her own body condition. Practicing the asana with precision will stimulate the practitioner’s perception of the proper functioning of the organs and senses. The physical practice of yoga will sculpt a strong and healthy body, which awakens an internal and instinctive intelligence. This internal intelligence will steady the mind and help guide one through the various stages of life.
    </p>
      <p>
        The awareness that is cultivated through the practice of asana improves the strength and mobility of the skeletal and muscular systems. As a result, the mind itself becomes more deeply interested in questioning and taking charge of lifestyle choices. The softening and rejuvenation of the flesh, i.e. the general health of the entire body, leads to a deeper connection with the primordial mind.
    </p>
      <p>
        RKM Acharya Yoga is a holistic education that brings the student into health and harmony. It is suitable for anyone looking to balance and clear the body and mind, as well as anyone seeking to lead a life with full conscious awareness.
    </p>
    </div>
    </div>
  </Container>
}

export default IndexPage

export const query = graphql`
  query indexQuery {
    backdrop: contentfulAsset(title: {eq: "rkmacharya"}) {
      sizes(quality: 100 maxWidth: 5000) {
       ...GatsbyContentfulSizes_withWebp
      }
    }
  }
`