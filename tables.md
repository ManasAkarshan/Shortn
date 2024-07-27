##clicks table
 ->id
 ->createdAt
 ->url_id  {foreign key -> urls.id}
 ->city
 ->device
 ->country
 
##urls table
 ->id
 ->createdAt
 ->original_url
 ->short_url
 ->custom
 ->user_id {foreign key -> auth. users.id}
 ->title
 ->qr