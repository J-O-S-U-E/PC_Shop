export default { 
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
        { 
            name: 'image',
            title: 'Image',
            type: 'array',
            of: [{ type: 'image' }],
            options: {
                hotspot: true,
            }
        },
        {
            name: 'name',
            title: 'Name',
            type: 'string',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 90,
            }
        },
        {
            name: 'categorySet',
            title: 'Category Set',
            type: 'array',
            of: [{type: 'string'}],
            options: {
                list: [
                    {title: 'GPU', value: 'gpu'},
                    {title: 'CPU', value: 'cpu'},
                    {title: 'Computer Case', value: 'computerCase'},
                    {title: 'Motherboard', value: 'motherboard'},
                    {title: 'Memory', value: 'memory'},
                    {title: 'Storage', value: 'storage'}
                ]
            }
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number',
        },
        {
            name: 'details',
            title: 'Details',
            type: 'string',
        },
        {
            name: 'featured',
            title: 'Featured',
            type: 'boolean',
        },
    ]
}