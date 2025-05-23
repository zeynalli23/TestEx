"""update_test_results_schema

Revision ID: 2a52cd7d0bcf
Revises: 4c296ceb1f0b
Create Date: 2025-04-23 13:23:14.863114

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = '2a52cd7d0bcf'
down_revision: Union[str, None] = '4c296ceb1f0b'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index('ix_pdf_storage_id', table_name='pdf_storage')
    op.drop_table('pdf_storage')
    # ### end Alembic commands ###


def downgrade() -> None:
    """Downgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('pdf_storage',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('test_result_id', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('pdf_data', postgresql.BYTEA(), autoincrement=False, nullable=True),
    sa.Column('created_at', postgresql.TIMESTAMP(), autoincrement=False, nullable=True),
    sa.ForeignKeyConstraint(['test_result_id'], ['test_results.id'], name='pdf_storage_test_result_id_fkey'),
    sa.PrimaryKeyConstraint('id', name='pdf_storage_pkey'),
    sa.UniqueConstraint('test_result_id', name='pdf_storage_test_result_id_key')
    )
    op.create_index('ix_pdf_storage_id', 'pdf_storage', ['id'], unique=False)
    # ### end Alembic commands ###
