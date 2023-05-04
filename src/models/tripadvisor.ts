export interface TripadvisorReview {
	id: string;
	lang: string;
	location_id: string;
	published_date: string;
	rating: number;
	helpful_votes: string;
	rating_image_url: string;
	url: string;
	trip_type: string;
	travel_date: string;
	text: string;
	title: string;
	user: {
		"username": string,
		"avatar":{
			thumbnail: string;
		},
	}
}

export interface TripadvisorResponse {
	data: TripadvisorReview[];
}
