\c emailjs_demo


--SELECT * FROM privateKeys;
--SHOW data_directory; --shows database save location

-- SELECT privateKeys.key as key, privateKeys.type, privateKeys.purpose as purpose, 
-- publicKeys.key as key, publicKeys.purpose as purpose
-- FROM privateKeys
-- FULL JOIN publicKeys ON publicKeys.purpose = privateKeys.purpose

SELECT key from privateKeys
WHERE purpose = 'reCAPTCHA'  

--try subquery??https://www.techrepublic.com/article/sql-basics-query-multiple-tables/

    -- {
    --     key: 'clxmckdmnvfk  reone43298r 4 t',
    --     type: 'public_key',
    --     purpose: 'emailJS',
    -- },

    --     key: 'fv5tbt561242104520t4vu76i',
    --     type: 'private_key',
    --     purpose: 'emailJS',
    -- },
    -- {
    --     key: 'this_is_my_service_id',
    --     type: 'service_id',
    --     purpose: 'emailJS',
    -- },
    -- {
    --     key: 'this_is_my_template_id',
    --     type: 'template_id',
    --     purpose: 'emailJS',