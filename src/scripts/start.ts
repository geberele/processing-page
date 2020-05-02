import { getProcessingPage } from '../processing-page';

const args = process.argv.slice(2);
let data = (args[0]) ? JSON.parse(args[0]) : [{ state: 'processing' }, { state: 'error' }];
const processingPage = async () => await getProcessingPage(data);
// tslint:disable-next-line:no-console
processingPage().then(console.log);
