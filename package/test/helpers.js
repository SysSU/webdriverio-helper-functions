export async function login(
    username = 'standard_user',
    password = 'secret_sauce'
) {
    await $('h4').waitForExist();
    await $('#user-name').setValue(username);
    await $('#password').setValue(password);
    await $('#login-button').click();
}
