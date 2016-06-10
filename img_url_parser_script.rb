stores = Store.all

stores.each do |store|
	new_url = store.img_url
	new_url.slice!(-6..-1)
	new_url += "o.jpg"
	store.update_attributes(img_url: new_url)
end