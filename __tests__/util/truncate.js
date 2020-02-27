import '../database';

import Cliente from '../../src/app/schemas/Cliente';

export default function truncate() {
    return Cliente.remove();
}
