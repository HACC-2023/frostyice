import connectDB from '@/lib/mongodb';
import Event from '@/models/event';
import { sendEmail } from '@/server/mailService';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const {
        publicType,
        publicTypeOther,
        publicContainerFullness,
        publicClaimBoat,
        publicBiofoulingRating,
        publicLocationDesc,
        publicLatLongOrPositionDescription,
        nearestIsland,
        nearestLandmark,
        debrisLandmarkRelativeLocation,
        publicDebrisDesc,
        publicDebrisAdditionalDesc,
        imageUrl,
        firstName,
        lastName,
        email,
        phoneNumber,
      } = await req.body;

      await connectDB();

      const created = await Event.create({
        status: 'Reported',
        publicType,
        publicTypeOther,
        publicContainerFullness,
        publicClaimBoat,
        publicBiofoulingRating,
        publicLocationDesc,
        publicLatLongOrPositionDescription,
        nearestIsland,
        nearestLandmark,
        debrisLandmarkRelativeLocation,
        publicDebrisDesc,
        publicDebrisAdditionalDesc,
        imageUrl,
        publicContact: {
          firstName,
          lastName,
          email,
          phoneNumber,
        },
      });

      const containerFullness = publicContainerFullness ? `<b>Container Fullness:</b> ${publicContainerFullness}<br/>` : '';
      const claimBoat = publicClaimBoat ? `<b>Intend to Claim Boat:</b> ${publicClaimBoat}<br/>` : '';
      const latLongOrPositionDescription = publicLatLongOrPositionDescription ? `<b>Position Description:</b> ${publicLatLongOrPositionDescription}<br/>` : '';
      const additionalDesc = publicDebrisAdditionalDesc ? `<b>Additional Description:</b> ${publicDebrisAdditionalDesc}<br/>` : '';

      // TODO update link at bottom of email
      const emailMessage = `
        Aloha,
        <br/><br/>
        We recieved a new debris report! Details:
        <br/><br/>
        <b>Type:</b> ${publicType !== 'Other' ? publicType : `Other - ${publicTypeOther}`}<br/>
        ${containerFullness}
        ${claimBoat}
        <b>Nearest Island:</b> ${nearestIsland}<br/>
        <b>Nearest Landmark:</b> ${nearestLandmark}<br/>
        <b>Landmark Relative Location:</b> ${debrisLandmarkRelativeLocation}<br/>
        ${latLongOrPositionDescription}
        <b>Location Description:</b> ${publicLocationDesc}<br/>
        <b>Debris Description:</b> ${publicDebrisDesc}<br/>
        ${additionalDesc}
        <b>Biofouling Rating:</b> ${publicBiofoulingRating} / 10<br/>
        <br/>
        <b>Reporter Name:</b> ${lastName}, ${firstName}<br/>
        <b>Reporter Email:</b> ${email}<br/>
        <b>Reporter Phone:</b> ${phoneNumber}<br/>
        <br/>
        <a href="http://localhost:3000/event/${created._id}">See more details</a>
        <br/><br/>
        Mahalo!<br/><br/>
        Center for Marine Debris Research
        <br/><br/><hr/>
        <i>This is an automated message. Please do not reply to this email.</i>
      `;
      await sendEmail('New Debris Report', null, emailMessage);
      res.status(200).json({msg: 'Event reported'});
    } catch (error) {
      console.log(error);
      res.status(500).json({error: 'Unable to report event'});
    }
  } else {
    res.status(405).json({error: 'Method not allowed'});
  }
}
